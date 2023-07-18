import { OrderType } from "../enums/OrderType";

type CreatedOrder = {
  order_id: number;
  quantity: number;
  net: number;
  type: OrderType;
  customer: number;
  created_by: number;
  modified_by: number;
  business_id: number;
};

export default CreatedOrder;
