import Sequelize, { Model } from "sequelize";
import { injectable, inject } from "tsyringe";
import generator from "generate-password";
import IODataParser, {
  IODataParserProivder,
} from "../interfaces/common-interfaces/IODataParser";
import IUserData, {
  IUserDataProivder,
} from "../interfaces/data-interfaces/IUserData";
import { IUserService } from "../interfaces/service-interfaces/IUserService";
import BaseService from "./BaseService";
import { SContext } from "../types/SContext";
import { CommanFunctions } from "../utils/CommanFunctions";

@injectable()
export default class UserService extends BaseService implements IUserService {
  private iUserData: IUserData;
  constructor(
    @inject(IUserDataProivder) iUserData: IUserData,
    @inject(IODataParserProivder) iODataParser: IODataParser
  ) {
    super(iUserData, iODataParser);
    this.iUserData = iUserData;
  }
  add = async (
    model: Object,
    context: SContext,
    transaction?: Sequelize.Transaction
  ): Promise<Model> => {
    const data_object = CommanFunctions.addInsertProps(model, context);
    //create random password for newly added user
    const password = generator.generate({
      length: 10,
      numbers: true,
    });
    const result = await this.iUserData.add(
      { ...data_object, password },
      transaction
    );
    return result;
  };
}
