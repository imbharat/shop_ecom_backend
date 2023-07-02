import Products from "../entities/Products";
import { injectable } from "tsyringe";
import IProductData from "../interfaces/data-interfaces/IProductData";
import BaseData from "./BaseData";
import ImportProducts from "../models/ImportProducts";

@injectable()
export default class ProductData
  extends BaseData<Products>
  implements IProductData
{
  constructor() {
    super(Products);
  }
  import = async (products: ImportProducts[]) => {
    return await Products.bulkCreate(products);
  };
}
