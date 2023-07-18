import { injectable, inject } from "tsyringe";
import Sequelize from "sequelize";
import IODataParser, {
  IODataParserProivder,
} from "../interfaces/common-interfaces/IODataParser";
import IVendorData, {
  IVendorDataProivder,
} from "../interfaces/data-interfaces/IVendorData";
import { IVendorService } from "../interfaces/service-interfaces/IVendorService";
import ImportVendors from "../models/ImportVendors";
import BaseService from "./BaseService";

@injectable()
export default class VendorService
  extends BaseService
  implements IVendorService
{
  private iVendorData: IVendorData;
  constructor(
    @inject(IVendorDataProivder) iVendortData: IVendorData,
    @inject(IODataParserProivder) iODataParser: IODataParser
  ) {
    super(iVendortData, iODataParser);
    this.iVendorData = iVendortData;
  }
  import = async (
    vendors: ImportVendors[],
    transaction?: Sequelize.Transaction
  ) => {
    return this.iVendorData.import(vendors, transaction);
  };
}
