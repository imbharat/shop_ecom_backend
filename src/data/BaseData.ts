import {
  Model,
  QueryTypes,
  ModelStatic,
  DestroyOptions,
  Attributes,
} from "sequelize";
import { injectable } from "tsyringe";
import sequelize from "../entities/init/Init";
import IBaseData from "../interfaces/data-interfaces/IBaseData";

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
    const count = await sequelize.query(countQuery, {
      type: QueryTypes.SELECT,
    });
    const result = await sequelize.query(odataQuery, {
      type: QueryTypes.SELECT,
    });
    return {
      count: count,
      value: result,
    };
  };
  get = async (): Promise<T[]> => {
    return await this.model.findAll();
  };
  getById = async (id: number): Promise<T> => {
    throw new Error("Method not implemented.");
  };
  post = async (model: Object): Promise<T> => {
    throw new Error("Method not implemented.");
  };
  update = async (id: number, model: Object): Promise<T> => {
    throw new Error("Method not implemented.");
  };
  delete = async (
    condition: DestroyOptions<Attributes<Model>>
  ): Promise<number> => {
    return await this.model.destroy(condition);
  };
}
