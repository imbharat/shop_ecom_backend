import { Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import IBaseService, {
  IBaseServiceProivder,
} from "../interfaces/service-interfaces/IBaseService";
import { OData } from "../types/OData";
import { SContext } from "../types/SContext";

@autoInjectable()
export default class BaseController {
  private iBaseService: IBaseService;
  constructor(@inject(IBaseServiceProivder) iBaseService: IBaseService) {
    this.iBaseService = iBaseService;
  }

  getOData = async (
    req: Request,
    res: Response,
    odata: (odata: OData, paramsWhereClaue: string) => string,
    odata_count: ($filter: string, paramsWhereClaue: string) => string
  ) => {
    const response = await this.iBaseService.getOData(
      req.params,
      req.query,
      odata,
      odata_count
    );
    res.send(response);
  };

  get = async (req: Request, res: Response) => {
    const context: SContext = {
      business_id: 1,
      user_id: 1,
    };
    const response = await this.iBaseService.get(context, {});
    res.send(response);
  };

  getById = async (req: Request, res: Response) => {
    const response = await this.iBaseService.getById(req.params.id);
    res.send(response);
  };

  add = async (req: Request, res: Response) => {
    const context: SContext = {
      business_id: 1,
      user_id: 1,
    };
    const response = await this.iBaseService.add(req.body, context);
    res.send(response);
  };

  update = async (req: Request, res: Response) => {
    const context: SContext = {
      business_id: 1,
      user_id: 1,
    };
    const response = await this.iBaseService.update(
      req.params,
      req.body,
      context
    );
    res.status(200).send(response);
  };

  delete = async (req: Request, res: Response) => {
    const context: SContext = {
      business_id: 1,
      user_id: 1,
    };
    const response = await this.iBaseService.delete(req.params, context);
    res.status(200).send({
      count: response,
    });
  };
}
