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

@autoInjectable()
export default class ProductController extends BaseController {
  private iProductService: IProductService;
  constructor(
    @inject(IProductServiceProivder) iProductService?: IProductService
  ) {
    super(iProductService);
    this.iProductService = iProductService;
  }

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

  bulksell = async (req: Request, res: Response) => {
    const context: SContext = {
      business_id: 1,
      user_id: 1,
    };
    const sell_products: BulkSellProducts[] = req?.body?.data;
    if (sell_products?.length) {
      await this.iProductService.bulksell(context, sell_products);
      return res.status(200).send(true);
    }
    return res.status(400).send(false);
  };

  bulkmove = async (req: Request, res: Response) => {
    const context: SContext = {
      business_id: 1,
      user_id: 1,
    };
    const sell_products: BulkMoveProducts[] = req?.body?.data;
    if (sell_products?.length) {
      await this.iProductService.bulkmove(context, sell_products);
      return res.status(200).send(true);
    }
    return res.status(400).send(false);
  };
}
