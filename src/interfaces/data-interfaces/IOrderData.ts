import Orders from "../../entities/Orders";
import IBaseData from "./IBaseData";

export default interface IOrderData extends IBaseData<Orders> {}

export const IOrderDataProivder = "IOrderDataProivder";
