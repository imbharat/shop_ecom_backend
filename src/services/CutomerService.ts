import { injectable, inject } from "tsyringe";
import IODataParser, {
  IODataParserProivder,
} from "../interfaces/common-interfaces/IODataParser";
import ICustomerData, {
  ICustomerDataProivder,
} from "../interfaces/data-interfaces/ICustomerData";
import { ICustomerService } from "../interfaces/service-interfaces/ICustomerService";
import BaseService from "./BaseService";
import ImportCutomers from "../models/ImportCustomers";
import Sequelize from "sequelize";

@injectable()
export default class CustomerService
  extends BaseService
  implements ICustomerService
{
  private iCustomerData: ICustomerData;
  constructor(
    @inject(ICustomerDataProivder) iCustomertData: ICustomerData,
    @inject(IODataParserProivder) iODataParser: IODataParser
  ) {
    super(iCustomertData, iODataParser);
    this.iCustomerData = iCustomertData;
  }
  import = async (
    customers: ImportCutomers[],
    transaction?: Sequelize.Transaction
  ) => {
    return this.iCustomerData.import(customers, transaction);
  };
}
