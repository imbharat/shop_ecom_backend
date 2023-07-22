import { injectable, inject } from "tsyringe";
import Sequelize, {
  Attributes,
  FindOptions,
  Model,
  Op,
  UpdateOptions,
  where,
} from "sequelize";
import IODataParser, {
  IODataParserProivder,
} from "../interfaces/common-interfaces/IODataParser";
import IBaseData, {
  IBaseDataProivder,
} from "../interfaces/data-interfaces/IBaseData";
import IBaseService from "../interfaces/service-interfaces/IBaseService";
import { OData } from "../types/OData";
import { SContext } from "../types/SContext";
import { CommanFunctions } from "../utils/CommanFunctions";
import { Col, Fn, Literal } from "sequelize/types/utils";

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
    query: OData,
    odata: (odata: OData, paramsWhereClaue: string) => string,
    odata_count: ($filter: string, paramsWhereClaue: string) => string
  ) => {
    try {
      const { countQuery, odataQuery } = this.iODataParser.parseToSQL(
        params,
        query,
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
      console.log(ex);
    }
  };
  get = async (context: SContext, options: FindOptions): Promise<Model[]> => {
    options = {
      ...options,
      where: CommanFunctions.addProps({ ...options.where }, context, false),
    };

    const result = await this.iBaseData.get(options);
    return result;
  };
  getById(id: number): Promise<Model> {
    throw new Error("Method not implemented.");
  }
  add = async (
    model: Object,
    context: SContext,
    transaction?: Sequelize.Transaction
  ): Promise<Model> => {
    const data_object = CommanFunctions.addProps(model, context, false);
    const result = await this.iBaseData.add(data_object, transaction);
    return result;
  };
  update = async (
    condition: UpdateOptions<Attributes<Model>>,
    values: {
      [key in keyof Attributes<Model>]?:
        | Attributes<Model>[key]
        | Fn
        | Col
        | Literal;
    },
    context: SContext
  ): Promise<[affectedCount: number, affectedRows: Model<any, any>[]]> => {
    const result = await this.iBaseData.update(values, {
      where: CommanFunctions.addProps(
        {
          ...condition,
        },
        context,
        false
      ),
    });
    return result;
  };
  delete = async (condition: Object, context: SContext): Promise<number> => {
    const filter = {
      where: {
        ...condition,
        business_id: context.business_id,
      },
    };
    const result = await this.iBaseData.delete(filter);
    return result;
  };
}
