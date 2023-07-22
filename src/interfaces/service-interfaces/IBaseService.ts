import Sequelize, {
  Attributes,
  FindOptions,
  Model,
  UpdateOptions,
} from "sequelize";
import { OData } from "../../types/OData";
import { SContext } from "../../types/SContext";
import { Col, Fn, Literal } from "sequelize/types/utils";

export default interface IBaseService {
  getOData(
    params: Object,
    query: OData,
    odata: (odata: OData, paramsWhereClaue: string) => string,
    odata_count: ($filter: string, paramsWhereClaue: string) => string
  ): Promise<Object>;
  get(context: SContext, options: FindOptions): Promise<Model[]>;
  getById(id: number): Promise<Object>;
  add(
    model: Object,
    context: SContext,
    transaction?: Sequelize.Transaction
  ): Promise<Object>;
  update(
    condition: UpdateOptions<Attributes<Model>>,
    values: {
      [key in keyof Attributes<Model>]?:
        | Attributes<Model>[key]
        | Fn
        | Col
        | Literal;
    },
    context: SContext
  ): Promise<[affectedCount: number, affectedRows: Model<any, any>[]]>;
  delete(condition: Object, context: SContext): Promise<number>;
}

export const IBaseServiceProivder = "IBaseServiceProivder";
