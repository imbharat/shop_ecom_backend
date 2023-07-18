import { autoInjectable, inject } from "tsyringe";
import BaseController from "./BaseController";
import {
  ILocationService,
  ILocationServiceProivder,
} from "../interfaces/service-interfaces/ILocationService";

@autoInjectable()
export default class LocationController extends BaseController {
  constructor(
    @inject(ILocationServiceProivder) iLocationService?: ILocationService
  ) {
    super(iLocationService);
  }
}
