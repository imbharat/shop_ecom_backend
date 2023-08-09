import { autoInjectable, inject } from "tsyringe";
import { Request, Response } from "express";
import BaseController from "./BaseController";
import {
  IProductService,
  IProductServiceProivder,
} from "../interfaces/service-interfaces/IProductService";
import ImportProducts from "../models/ImportProducts";
import BulkSellProducts from "../models/BulkSellProducts";
import { SContext } from "../types/SContext";
import BulkMoveProducts from "../models/BulkMoveProducts";
import ReturnProducts from "../models/ReturnProducts";
import AddEditProduct from "../models/AddEditProduct";

@autoInjectable()
export default class ProductController extends BaseController {
  private iProductService: IProductService;
  constructor(
    @inject(IProductServiceProivder) iProductService?: IProductService
  ) {
    super(iProductService);
    this.iProductService = iProductService;
  }

  add = async (req: Request, res: Response) => {
    const context: SContext = {
      business_id: 1,
      user_id: 1,
    };
    const product: AddEditProduct = req?.body;
    if (product) {
      await this.iProductService.import(context, [product]);
      return res.status(200).send(true);
    }
  };

  import = async (req: Request, res: Response) => {
    const context: SContext = {
      business_id: 1,
      user_id: 1,
    };
    const products: ImportProducts[] = req?.body?.data;
    if (products?.length) {
      await this.iProductService.import(context, products);
      return res.status(200).send(true);
    }
    return res.status(400).send(false);
  };

  return = async (req: Request, res: Response) => {
    const context: SContext = {
      business_id: 1,
      user_id: 1,
    };
    const products: ReturnProducts = req?.body;
    if (products?.product_id?.length) {
      await this.iProductService.return(context, products);
      return res.status(200).send(true);
    }
    return res.status(400).send(false);
  };

  bulkSell = async (req: Request, res: Response) => {
    const context: SContext = {
      business_id: 1,
      user_id: 1,
    };
    const sell_products: BulkSellProducts[] = req?.body?.data;
    if (sell_products?.length) {
      await this.iProductService.bulkSell(context, sell_products);
      return res.status(200).send(true);
    }
    return res.status(400).send(false);
  };

  bulkMove = async (req: Request, res: Response) => {
    const context: SContext = {
      business_id: 1,
      user_id: 1,
    };
    const move_products: BulkMoveProducts[] = req?.body?.data;
    if (move_products?.length) {
      await this.iProductService.bulkMove(context, move_products);
      return res.status(200).send(true);
    }
    return res.status(400).send(false);
  };
}
