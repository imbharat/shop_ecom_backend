import Products from "../../entities/Products";
import ImportProducts from "../../models/ImportProducts";
import IBaseService from "./IBaseService";

export interface IProductService extends IBaseService {
  import: (products: ImportProducts[]) => Promise<Products[]>;
}

export const IProductServiceProivder = "IProductServiceProivder";
