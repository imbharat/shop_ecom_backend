type BaseModel<T> = {
  created_by: number;
  modified_by: number;
  business_id: number;
} & T;

export default BaseModel;
