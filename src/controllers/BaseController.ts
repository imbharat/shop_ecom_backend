import { Request, Response } from "express";
import { autoInjectable, inject } from "tsyringe";
import IBaseService, {
  IBaseServiceProivder,
} from "../interfaces/service-interfaces/IBaseService";
import { OData } from "../types/OData";

@autoInjectable()
export default class BaseController {
  private iBaseService: IBaseService;
  constructor(@inject(IBaseServiceProivder) iBaseService: IBaseService) {
    this.iBaseService = iBaseService;
  }

  getOData = async (
    req: Request,
    res: Response,
    odata: (odata: OData) => string,
    odata_count: ($filter: string) => string
  ) => {
    const response = await this.iBaseService.getOData(
      req.query,
      odata,
      odata_count
    );
    res.send(response);
  };

  get = async (req: Request, res: Response) => {
    const response = await this.iBaseService.get();
    res.send(response);
  };

  getById = async (req: Request, res: Response) => {
    const response = await this.iBaseService.getById(req.params.id);
    res.send(response);
  };

  add = async (req: Request, res: Response) => {
    const response = await this.iBaseService.add(req.body);
    res.send(response);
  };

  update = async (req: Request, res: Response) => {
    const response = await this.iBaseService.update(req.params.id, req.body);
    res.send(response);
  };

  delete = async (req: Request, res: Response) => {
    const business_id = 1;
    const response = await this.iBaseService.delete(req.params, business_id);
    res.status(200).send({
      count: response,
    });
  };
}
