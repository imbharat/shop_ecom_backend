import { injectable, inject } from "tsyringe";
import IODataParser, {
  IODataParserProivder,
} from "../interfaces/common-interfaces/IODataParser";
import IOrderData, {
  IOrderDataProivder,
} from "../interfaces/data-interfaces/IOrderData";
import { IOrderService } from "../interfaces/service-interfaces/IOrderService";
import BaseService from "./BaseService";

@injectable()
export default class OrderService extends BaseService implements IOrderService {
  constructor(
    @inject(IOrderDataProivder) iOrderData: IOrderData,
    @inject(IODataParserProivder) iODataParser: IODataParser
  ) {
    super(iOrderData, iODataParser);
  }
}
