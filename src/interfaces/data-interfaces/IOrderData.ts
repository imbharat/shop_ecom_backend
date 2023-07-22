import Sequelize from "sequelize";
import Orders from "../../entities/Orders";
import BulkUpdateOrders from "../../models/BulkOrderUpdate";
import IBaseData from "./IBaseData";

export default interface IOrderData extends IBaseData<Orders> {
  bulkUpdate: (
    orders: BulkUpdateOrders[],
    transaction?: Sequelize.Transaction
  ) => Promise<Orders[]>;
}

export const IOrderDataProivder = "IOrderDataProivder";
