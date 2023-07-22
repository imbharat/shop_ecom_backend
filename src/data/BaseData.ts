import Sequelize, {
  Model,
  QueryTypes,
  ModelStatic,
  DestroyOptions,
  Attributes,
  UpdateOptions,
  FindOptions,
} from "sequelize";
import { injectable } from "tsyringe";
import sequelize from "../entities/init/Init";
import IBaseData from "../interfaces/data-interfaces/IBaseData";
import BaseModel from "../models/BaseModel";
import { Col, Fn, Literal } from "sequelize/types/utils";

@injectable()
export default class BaseData<T extends Model> implements IBaseData<T> {
  private model: ModelStatic<T>;
  constructor(model: ModelStatic<T>) {
    this.model = model;
  }
  getOData = async (
    countQuery: string,
    odataQuery: string
  ): Promise<{ count: T[]; value: T[] }> => {
    const count = countQuery
      ? await sequelize.query(countQuery, {
          type: QueryTypes.SELECT,
        })
      : 0;
    const result = odataQuery
      ? await sequelize.query(odataQuery, {
          type: QueryTypes.SELECT,
        })
      : [];
    return {
      count: count,
      value: result,
    };
  };
  get = async (
    options: FindOptions,
    transaction?: Sequelize.Transaction
  ): Promise<T[]> => {
    const { attributes, where, limit, offset, order } = options;
    return await this.model.findAll({
      attributes,
      where,
      limit,
      order,
      offset,
      transaction,
    });
  };
  getById = async (id: number): Promise<T> => {
    throw new Error("Method not implemented.");
  };
  add = async (
    data: BaseModel<any>,
    transaction?: Sequelize.Transaction
  ): Promise<T> => {
    return await this.model.create(data, {
      transaction,
    });
  };
  update = async (
    values: {
      [key in keyof Attributes<Model>]?:
        | Attributes<Model>[key]
        | Fn
        | Col
        | Literal;
    },
    options: UpdateOptions<Attributes<Model>>,
    transaction?: Sequelize.Transaction
  ): Promise<[affectedCount: number, affectedRows: T[]]> => {
    const { where } = options;
    return await this.model.update(values, {
      where,
      transaction,
      returning: true,
    });
  };
  delete = async (
    options: DestroyOptions<Attributes<Model>>
  ): Promise<number> => {
    return await this.model.destroy(options);
  };
}
