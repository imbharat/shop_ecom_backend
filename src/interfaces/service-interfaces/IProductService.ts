import Products from "../../entities/Products";
import ImportProducts from "../../models/ImportProducts";
import { SContext } from "../../types/SContext";
import IBaseService from "./IBaseService";
import BulkSellProducts from "../../models/BulkSellProducts";
import BulkMoveProducts from "../../models/BulkMoveProducts";
import ReturnProducts from "../../models/ReturnProducts";

export interface IProductService extends IBaseService {
  import: (
    context: SContext,
    products: ImportProducts[]
  ) => Promise<Products[]>;
  return: (context: SContext, products: ReturnProducts) => Promise<Products[]>;
  bulkSell: (
    context: SContext,
    sell_products: BulkSellProducts[]
  ) => Promise<Products[]>;
  bulkMove: (
    context: SContext,
    move_products: BulkMoveProducts[]
  ) => Promise<Products[]>;
}

export const IProductServiceProivder = "IProductServiceProivder";
