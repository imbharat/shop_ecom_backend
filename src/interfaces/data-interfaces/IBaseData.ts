import { Attributes, DestroyOptions, Model } from "sequelize";

export default interface IBaseData<T> {
  getOData(
    countQuery: string,
    odataQuery: string
  ): Promise<{ count: T[]; value: T[] }>;
  get(): Promise<T[]>;
  getById(id: number): Promise<T>;
  post(model: Object): Promise<T>;
  update(id: number, model: Object): Promise<T>;
  delete(condition: DestroyOptions<Attributes<Model>>): Promise<number>;
}

export const IBaseDataProivder = "IBaseDataProivder";
