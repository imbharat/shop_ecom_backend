import BaseModel from "./BaseModel";

type BulkUpdateOrders = BaseModel<{
  order_id: number;
  quantity: number;
  net: number;
}>;

export default BulkUpdateOrders;
