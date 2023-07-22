import Orders from "../entities/Orders";
import { injectable } from "tsyringe";
import IOrderData from "../interfaces/data-interfaces/IOrderData";
import BaseData from "./BaseData";
import BulkUpdateOrders from "../models/BulkOrderUpdate";
import Sequelize from "sequelize";

@injectable()
export default class OrderData extends BaseData<Orders> implements IOrderData {
  constructor() {
    super(Orders);
  }

  bulkUpdate = async (
    orders: BulkUpdateOrders[],
    transaction?: Sequelize.Transaction
  ) => {
    return await Orders.bulkCreate(orders, {
      updateOnDuplicate: ["quantity", "net"],
      transaction: transaction,
    });
  };
}
