import Sequelize from "sequelize";
import Products from "../entities/Products";
import { injectable } from "tsyringe";
import IProductData from "../interfaces/data-interfaces/IProductData";
import BaseData from "./BaseData";
import ImportProducts from "../models/ImportProducts";
import BulkUpdateProducts from "../models/BulkUpdateProducts";

@injectable()
export default class ProductData
  extends BaseData<Products>
  implements IProductData
{
  constructor() {
    super(Products);
  }
  import = async (
    products: ImportProducts[],
    transaction?: Sequelize.Transaction
  ) => {
    return await Products.bulkCreate(products, { transaction: transaction });
  };
  bulkUpdate = async (
    products: BulkUpdateProducts[],
    transaction?: Sequelize.Transaction
  ) => {
    return await Products.bulkCreate(products, {
      updateOnDuplicate: ["sell_price", "status", "order_id", "location"],
      transaction: transaction,
    });
  };
}
