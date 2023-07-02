import { autoInjectable, inject } from "tsyringe";
import { Request, Response } from "express";
import BaseController from "./BaseController";
import {
  IProductService,
  IProductServiceProivder,
} from "../interfaces/service-interfaces/IProductService";
import ImportProducts from "../models/ImportProducts";

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
    const products: ImportProducts[] = req?.body?.data;
    if (products?.length) {
      await this.iProductService.import(products);
      return res.status(200).send(true);
    }
    return res.status(400).send(false);
  };
}
