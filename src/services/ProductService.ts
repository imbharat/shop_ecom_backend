import { injectable, inject } from "tsyringe";
import sequelize from "../entities/init/Init";
import Products from "../entities/Products";
import IODataParser, {
  IODataParserProivder,
} from "../interfaces/common-interfaces/IODataParser";
import IProductData, {
  IProductDataProivder,
} from "../interfaces/data-interfaces/IProductData";
import { IVendorDataProivder } from "../interfaces/data-interfaces/IVendorData";
import { IProductService } from "../interfaces/service-interfaces/IProductService";
import {
  IVendorService,
  IVendorServiceProivder,
} from "../interfaces/service-interfaces/IVendorService";
import ImportProducts from "../models/ImportProducts";
import BaseService from "./BaseService";

@injectable()
export default class ProductService
  extends BaseService
  implements IProductService
{
  private iProductData: IProductData;
  private iVendorService: IVendorService;
  constructor(
    @inject(IProductDataProivder) iProductData: IProductData,
    @inject(IVendorServiceProivder) iVendorService: IVendorService,
    @inject(IODataParserProivder) iODataParser: IODataParser
  ) {
    super(iProductData, iODataParser);
    this.iProductData = iProductData;
    this.iVendorService = iVendorService;
  }
  import = async (products: ImportProducts[]) => {
    let products_added: Products[] = [];

    try {
      await sequelize.transaction(async (t) => {
        //first create vendors
        //later check this on basis of business requirements
        if (true) {
          const vendors = products.map((product) => {
            return {
              vendor_name: product.vendor,
              created_by: 1, //get logged in user id from context
              modified_by: 1, //get logged in user id from context
              business_id: 1, //current business id from context
            };
          });
          const result = await this.iVendorService.import(vendors);

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
              return {
                ...product,
                vendor: vendor_map[product.vendor],
                created_by: 1, //get logged in user id from context
                modified_by: 1, //get logged in user id from context
                business_id: 1, //current business id from context
              };
            });
          }
        }
        // insert products
        products_added = await this.iProductData.import(products);
      });
      return products_added;
    } catch (ex) {
      throw ex;
    }
  };
}
