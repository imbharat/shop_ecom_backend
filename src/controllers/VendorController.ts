import { autoInjectable, inject } from "tsyringe";
import BaseController from "./BaseController";
import {
  IVendorService,
  IVendorServiceProivder,
} from "../interfaces/service-interfaces/IVendorService";

@autoInjectable()
export default class VendorController extends BaseController {
  constructor(@inject(IVendorServiceProivder) iVendorService?: IVendorService) {
    super(iVendorService);
  }
}
