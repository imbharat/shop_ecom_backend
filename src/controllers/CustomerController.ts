import { autoInjectable, inject } from "tsyringe";
import BaseController from "./BaseController";
import {
  ICustomerService,
  ICustomerServiceProivder,
} from "../interfaces/service-interfaces/ICustomerService";

@autoInjectable()
export default class CustomerController extends BaseController {
  constructor(
    @inject(ICustomerServiceProivder) iCustomerService?: ICustomerService
  ) {
    super(iCustomerService);
  }
}
