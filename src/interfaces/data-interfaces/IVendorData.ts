import Sequelize from "sequelize";
import Vendors from "../../entities/Vendors";
import ImportVendors from "../../models/ImportVendors";
import IBaseData from "./IBaseData";

export default interface IVendorData extends IBaseData<Vendors> {
  import: (
    vendors: ImportVendors[],
    transaction?: Sequelize.Transaction
  ) => Promise<Vendors[]>;
}

export const IVendorDataProivder = "IVendorDataProivder";
