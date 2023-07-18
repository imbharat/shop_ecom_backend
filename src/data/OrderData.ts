import Orders from "../entities/Orders";
import { injectable } from "tsyringe";
import IOrderData from "../interfaces/data-interfaces/IOrderData";
import BaseData from "./BaseData";

@injectable()
export default class OrderData extends BaseData<Orders> implements IOrderData {
  constructor() {
    super(Orders);
  }
}
