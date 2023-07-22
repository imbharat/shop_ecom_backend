import Sequelize from "sequelize";
import Products from "../../entities/Products";
import ImportProducts from "../../models/ImportProducts";
import IBaseData from "./IBaseData";
import BulkUpdateProducts from "../../models/BulkUpdateProducts";

export default interface IProductData extends IBaseData<Products> {
  import: (
    products: ImportProducts[],
    transaction?: Sequelize.Transaction
  ) => Promise<Products[]>;
  bulkUpdate: (
    products: BulkUpdateProducts[],
    transaction?: Sequelize.Transaction
  ) => Promise<Products[]>;
}

export const IProductDataProivder = "IProductDataProivder";
