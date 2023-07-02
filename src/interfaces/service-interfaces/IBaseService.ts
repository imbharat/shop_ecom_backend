import { OData } from "../../types/OData";

export default interface IBaseService {
  getOData(
    query: OData,
    odata: (odata: OData) => string,
    odata_count: ($filter: string) => string
  ): Promise<Object>;
  get(): Promise<Object[]>;
  getById(id: number): Promise<Object>;
  add(model: Object): Promise<Object>;
  update(id: number, model: Object): Promise<Object>;
  delete(condition: Object, business_id: number): Promise<number>;
}

export const IBaseServiceProivder = "IBaseServiceProivder";
