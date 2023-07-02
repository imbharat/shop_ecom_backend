import Products from "../../entities/Products";
import ImportProducts from "../../models/ImportProducts";
import IBaseData from "./IBaseData";

export default interface IProductData extends IBaseData<Products> {
  import: (products: ImportProducts[]) => Promise<Products[]>;
}

export const IProductDataProivder = "IProductDataProivder";
