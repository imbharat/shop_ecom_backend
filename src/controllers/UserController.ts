import { autoInjectable, inject } from "tsyringe";
import { Request, Response } from "express";
import BaseController from "./BaseController";
import {
  IUserService,
  IUserServiceProivder,
} from "../interfaces/service-interfaces/IUserService";
import { SContext } from "../types/SContext";

@autoInjectable()
export default class UserController extends BaseController {
  private iUserService: IUserService;
  constructor(@inject(IUserServiceProivder) iUserService?: IUserService) {
    super(iUserService);
    this.iUserService = iUserService;
  }
  add = async (req: Request, res: Response) => {
    const context: SContext = {
      business_id: 1,
      user_id: 1,
    };
    const response = await this.iUserService.add(req.body, context);
    res.send(response);
  };
}
