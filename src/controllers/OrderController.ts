import { autoInjectable, inject } from "tsyringe";
import BaseController from "./BaseController";
import {
  IOrderService,
  IOrderServiceProivder,
} from "../interfaces/service-interfaces/IOrderService";

@autoInjectable()
export default class OrderController extends BaseController {
  constructor(@inject(IOrderServiceProivder) iOrderService?: IOrderService) {
    super(iOrderService);
  }
}
