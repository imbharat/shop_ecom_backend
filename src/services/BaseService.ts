import { injectable, inject } from "tsyringe";
import { Model } from "sequelize";
import IODataParser, {
  IODataParserProivder,
} from "../interfaces/common-interfaces/IODataParser";
import IBaseData, {
  IBaseDataProivder,
} from "../interfaces/data-interfaces/IBaseData";
import IBaseService from "../interfaces/service-interfaces/IBaseService";
import { OData } from "../types/OData";

@injectable()
export default class BaseService implements IBaseService {
  private iBaseData: IBaseData<Model>;
  private iODataParser?: IODataParser;
  constructor(
    @inject(IBaseDataProivder) iBaseData: IBaseData<Model>,
    @inject(IODataParserProivder) iODataParser: IODataParser
  ) {
    this.iBaseData = iBaseData;
    this.iODataParser = iODataParser;
  }
  getOData = async (
    params: Object,
    odata: (odata: OData) => string,
    odata_count: ($filter: string) => string
  ) => {
    try {
      const { countQuery, odataQuery } = this.iODataParser.parseToSQL(
        params,
        odata,
        odata_count
      );
      const result = await this.iBaseData.getOData(countQuery, odataQuery);
      const { count, value } = result;
      return {
        ["@odata.count"]: Number(count?.[0]?.["count"]),
        value: value,
      };
    } catch (ex) {
      throw ex;
    }
  };
  get = async (): Promise<Model[]> => {
    const result = await this.iBaseData.get();
    return result;
  };
  getById(id: number): Promise<Model> {
    throw new Error("Method not implemented.");
  }
  add(model: Object): Promise<Model> {
    throw new Error("Method not implemented.");
  }
  update(id: number, model: Object): Promise<Model> {
    throw new Error("Method not implemented.");
  }
  delete(condition: Object, business_id: number): Promise<number> {
    const filter = {
      where: {
        ...condition,
        business_id,
      },
    };
    const result = this.iBaseData.delete(filter);
    return result;
  }
}
