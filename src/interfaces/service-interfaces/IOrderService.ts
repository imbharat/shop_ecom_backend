import Sequelize from "sequelize";
import BulkUpdateOrders from "../../models/BulkOrderUpdate";
import IBaseService from "./IBaseService";
import Orders from "../../entities/Orders";

export interface IOrderService extends IBaseService {
  bulkUpdate: (
    orders: BulkUpdateOrders[],
    transaction?: Sequelize.Transaction
  ) => Promise<Orders[]>;
}

export const IOrderServiceProivder = "IOrderServiceProivder";
