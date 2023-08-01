import { injectable, inject } from "tsyringe";
import Sequelize, { Op } from "sequelize";
import sequelize from "../entities/init/Init";
import Products from "../entities/Products";
import IODataParser, {
  IODataParserProivder,
} from "../interfaces/common-interfaces/IODataParser";
import IProductData, {
  IProductDataProivder,
} from "../interfaces/data-interfaces/IProductData";
import { IProductService } from "../interfaces/service-interfaces/IProductService";
import {
  IVendorService,
  IVendorServiceProivder,
} from "../interfaces/service-interfaces/IVendorService";
import ImportProducts from "../models/ImportProducts";
import BaseService from "./BaseService";
import BulkSellProducts from "../models/BulkSellProducts";
import { ProductStatus } from "../enums/ProductStatus";
import { SContext } from "../types/SContext";
import {
  IOrderService,
  IOrderServiceProivder,
} from "../interfaces/service-interfaces/IOrderService";
import { OrderType } from "../enums/OrderType";
import CreatedOrder from "../models/CreatedOrder";
import {
  ICustomerService,
  ICustomerServiceProivder,
} from "../interfaces/service-interfaces/ICustomerService";
import CreatedCustomer from "../models/CreatedCustomer";
import { CommanFunctions } from "../utils/CommanFunctions";
import BulkMoveProducts from "../models/BulkMoveProducts";
import {
  ILocationService,
  ILocationServiceProivder,
} from "../interfaces/service-interfaces/ILocationService";
import ReturnProducts from "../models/ReturnProducts";

@injectable()
export default class ProductService
  extends BaseService
  implements IProductService
{
  private iProductData: IProductData;
  private iVendorService: IVendorService;
  private iOrderService: IOrderService;
  private iCustomerService: ICustomerService;
  private iLocationService: ILocationService;
  constructor(
    @inject(IProductDataProivder) iProductData: IProductData,
    @inject(IVendorServiceProivder) iVendorService: IVendorService,
    @inject(IOrderServiceProivder) iOrderService: IOrderService,
    @inject(ICustomerServiceProivder) iCustomerService: ICustomerService,
    @inject(ILocationServiceProivder) iLocationService: ILocationService,
    @inject(IODataParserProivder) iODataParser: IODataParser
  ) {
    super(iProductData, iODataParser);
    this.iProductData = iProductData;
    this.iVendorService = iVendorService;
    this.iOrderService = iOrderService;
    this.iCustomerService = iCustomerService;
    this.iLocationService = iLocationService;
  }

  import = async (context: SContext, products: ImportProducts[]) => {
    let products_added: Products[] = [];

    try {
      await sequelize.transaction(
        async (transaction: Sequelize.Transaction) => {
          //step 1: create vendors
          let vendors = products.map((product) => {
            return CommanFunctions.addInsertProps(
              {
                vendor_name: product.vendor,
              },
              context
            );
          });
          vendors = [
            ...new Map(
              vendors.map((vendor) => [vendor.vendor_name, vendor])
            ).values(),
          ];
          const result = await this.iVendorService.import(vendors, transaction);

          //vendors created successfully, now map vendors id to products
          if (result?.length) {
            //create map for faster access
            const vendor_map = result.reduce(
              (map, vendor) => (
                (map[vendor["vendor_name"]] = vendor["vendor_id"]), map
              ),
              {}
            );

            products = products.map((product) => {
              return CommanFunctions.addProps(
                {
                  ...product,
                  vendor: vendor_map[product.vendor],
                },
                context,
                false
              );
            });

            //step 2: insert products
            products_added = await this.iProductData.import(
              products,
              transaction
            );
          }
        }
      );
      return products_added;
    } catch (ex) {
      console.log(ex);
    }
  };

  return = async (context: SContext, products: ReturnProducts) => {
    let products_returned: Products[] = [];
    try {
      await sequelize.transaction(
        async (transaction: Sequelize.Transaction) => {
          //step 1: update products status to returned and get order id for those products
          const [returned_count, returned_products] =
            await this.iProductData.update(
              {
                status: ProductStatus.Returned,
              },
              {
                where: CommanFunctions.addProps(
                  {
                    ...products,
                    status: ProductStatus.Sold,
                  },
                  context,
                  false
                ),
                transaction,
              }
            );

          if (returned_count) {
            //step 2: update orders
            const orders_to_update: {
              order_id?: {
                quantity_to_reduce: number;
                net_to_reduce: number;
              };
            } = {};

            const order_ids = [];
            returned_products.forEach((prod) => {
              let oid = prod.getDataValue("order_id") as number;
              let sell_price = prod.getDataValue("sell_price") as number;
              let cost_price = prod.getDataValue("cost_price") as number;
              if (oid in orders_to_update) {
                const obj = orders_to_update[oid];
                orders_to_update[oid] = {
                  quantity_to_reduce: obj.quantity_to_reduce + 1,
                  net_to_reduce: obj.net_to_reduce + (sell_price - cost_price),
                };
              } else {
                orders_to_update[oid] = {
                  quantity_to_reduce: 1,
                  net_to_reduce: sell_price - cost_price,
                };
              }
              order_ids.push(oid);
            });

            const model = [];
            if (!!orders_to_update) {
              const orders = await this.iOrderService.get(context, {
                where: CommanFunctions.addProps(
                  {
                    order_id: order_ids,
                  },
                  context,
                  false
                ),
              });

              const order_map = orders.reduce(
                (map, order) => (
                  (map[order.getDataValue("order_id")] = {
                    prevQ: order.getDataValue("quantity"),
                    prevN: order.getDataValue("net"),
                  }),
                  map
                ),
                {}
              );

              for (let order in orders_to_update) {
                const q = orders_to_update[order].quantity_to_reduce;
                const n = orders_to_update[order].net_to_reduce;
                const pq = order_map[order].prevQ;
                const pn = order_map[order].prevN;
                model.push(
                  CommanFunctions.addProps(
                    {
                      order_id: order,
                      quantity: pq - q,
                      net: pn - n,
                    },
                    context,
                    false
                  )
                );
              }
            }

            await this.iOrderService.bulkUpdate(model);

            products_returned = returned_products;
          }
        }
      );
      return products_returned;
    } catch (ex) {
      console.log(ex);
    }
  };

  bulkSell = async (context: SContext, sell_products: BulkSellProducts[]) => {
    let products_sold: Products[] = [];

    try {
      //step 1: get and validate products (if exist or not)
      const products_ids = sell_products.map((product) => product.product_id);
      const products = await this.iProductData.get({
        attributes: ["product_id", "cost_price", "location"],
        where: CommanFunctions.addProps(
          {
            product_id: products_ids,
            status: [ProductStatus.Active, ProductStatus.Returned],
          },
          context,
          false
        ),
      });

      if (products?.length) {
        await sequelize.transaction(
          async (transaction: Sequelize.Transaction) => {
            //step 2: create or get customer id
            const customer = CommanFunctions.addInsertProps(
              {
                customer_name: sell_products?.[0]?.customer_name,
              },
              context
            );
            const result = await this.iCustomerService.import(
              [customer],
              transaction
            );
            const customer_id = result?.[0]?.["customer_id"] as number;

            //step 3: create order, create location name and id map (in memory)
            const location_map = {};
            sell_products = sell_products.filter((sell_prod) => {
              return products.find((prod) => {
                location_map[sell_prod.location] =
                  prod.getDataValue("location");
                return sell_prod.product_id == prod.getDataValue("product_id");
              });
            });

            const order_net = sell_products.reduce(
              (total, product) =>
                total + (product.sell_price - product.cost_price),
              0
            );
            const order = (await this.iOrderService.add(
              {
                quantity: sell_products.length,
                net: order_net,
                customer: customer_id,
                created_by: context.user_id,
                modified_by: context.user_id,
                business_id: context.business_id,
              },
              context,
              transaction
            )) as CreatedOrder;

            //step 4: update products status to sold and add order id, sell_price;
            const model = sell_products.map((sell_prod) =>
              CommanFunctions.addInsertProps(
                {
                  product_id: sell_prod.product_id,
                  product_name: sell_prod.product_name,
                  imei: sell_prod.imei,
                  barcode: sell_prod.barcode,
                  sell_price: sell_prod.sell_price,
                  status: ProductStatus.Sold,
                  location: location_map[sell_prod.location],
                  order_id: order.order_id,
                },
                context
              )
            );
            products_sold = await this.iProductData.bulkUpdate(
              model,
              transaction
            );
          }
        );
      }
      return products_sold;
    } catch (ex) {
      console.log(ex);
    }
  };

  bulkMove = async (context: SContext, move_products: BulkMoveProducts[]) => {
    let products_moved: Products[] = [];

    try {
      //step 1: get and validate products (if exist or not)
      const products_ids = move_products.map((product) => product.product_id);
      const products = await this.iProductData.get({
        attributes: ["product_id", "location"],
        where: CommanFunctions.addProps(
          {
            product_id: products_ids,
            status: [ProductStatus.Active, ProductStatus.Returned],
          },
          context,
          false
        ),
      });

      if (products?.length) {
        //step 2: get existing locations ids (do not create location, if does not exist)
        const locations = [
          ...new Set(move_products.map((product) => product.location)),
        ];
        const existing_locations = await this.iLocationService.get(context, {
          attributes: ["location_id", "location_name"],
          where: CommanFunctions.addProps(
            {
              location_name: locations,
            },
            context,
            false
          ),
        });

        // locations exist, now map location id to products
        if (
          existing_locations?.length &&
          existing_locations.length === locations.length
        ) {
          //create map for faster access
          const location_map = existing_locations.reduce(
            (map, location) => (
              (map[location["location_name"]] = location["location_id"]), map
            ),
            {}
          );

          const model = move_products.map((move_prod) =>
            CommanFunctions.addInsertProps(
              {
                product_id: move_prod.product_id,
                product_name: move_prod.product_name,
                imei: move_prod.imei,
                barcode: move_prod.barcode,
                status: move_prod.status,
                location: location_map[move_prod.location],
              },
              context
            )
          );
          products_moved = await this.iProductData.bulkUpdate(model);
        }
      }
      return products_moved;
    } catch (ex) {
      console.log(ex);
    }
  };
}
