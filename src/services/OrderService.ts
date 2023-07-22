import { injectable, inject } from "tsyringe";
import IODataParser, {
  IODataParserProivder,
} from "../interfaces/common-interfaces/IODataParser";
import IOrderData, {
  IOrderDataProivder,
} from "../interfaces/data-interfaces/IOrderData";
import { IOrderService } from "../interfaces/service-interfaces/IOrderService";
import BaseService from "./BaseService";
import BulkUpdateOrders from "../models/BulkOrderUpdate";
import Sequelize from "sequelize";
import { CommanFunctions } from "../utils/CommanFunctions";

@injectable()
export default class OrderService extends BaseService implements IOrderService {
  private iOrderData: IOrderData;
  constructor(
    @inject(IOrderDataProivder) iOrderData: IOrderData,
    @inject(IODataParserProivder) iODataParser: IODataParser
  ) {
    super(iOrderData, iODataParser);
    this.iOrderData = iOrderData;
  }

  bulkUpdate = async (
    orders: BulkUpdateOrders[],
    transaction?: Sequelize.Transaction
  ) => {
    return await this.iOrderData.bulkUpdate(orders, transaction);
  };
}
