import Sequelize, {
  Attributes,
  DestroyOptions,
  FindOptions,
  Model,
  UpdateOptions,
} from "sequelize";
import BaseModel from "../../models/BaseModel";
import { Col, Fn, Literal } from "sequelize/types/utils";

export default interface IBaseData<T> {
  getOData(
    countQuery: string,
    odataQuery: string
  ): Promise<{ count: T[]; value: T[] }>;
  get(options: FindOptions, transaction?: Sequelize.Transaction): Promise<T[]>;
  getById(id: number): Promise<T>;
  add(data: BaseModel<any>, transaction?: Sequelize.Transaction): Promise<T>;
  update(
    values: {
      [key in keyof Attributes<Model>]?:
        | Attributes<Model>[key]
        | Fn
        | Col
        | Literal;
    },
    options: UpdateOptions<Attributes<Model>>,
    transaction?: Sequelize.Transaction
  ): Promise<[affectedCount: number, affectedRows: T[]]>;
  delete(options: DestroyOptions<Attributes<Model>>): Promise<number>;
}

export const IBaseDataProivder = "IBaseDataProivder";
