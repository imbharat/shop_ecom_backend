import Products from "../../entities/Products";
import ImportProducts from "../../models/ImportProducts";
import { SContext } from "../../types/SContext";
import IBaseService from "./IBaseService";
import BulkSellProducts from "../../models/BulkSellProducts";
import BulkMoveProducts from "../../models/BulkMoveProducts";

export interface IProductService extends IBaseService {
  import: (
    context: SContext,
    products: ImportProducts[]
  ) => Promise<Products[]>;
  bulksell: (
    context: SContext,
    sell_products: BulkSellProducts[]
  ) => Promise<Products[]>;
  bulkmove: (
    context: SContext,
    move_products: BulkMoveProducts[]
  ) => Promise<Products[]>;
}

export const IProductServiceProivder = "IProductServiceProivder";
