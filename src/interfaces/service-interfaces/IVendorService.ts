import Sequelize from "sequelize";
import Vendors from "../../entities/Vendors";
import ImportVendors from "../../models/ImportVendors";
import IBaseService from "./IBaseService";

export interface IVendorService extends IBaseService {
  import: (
    vendors: ImportVendors[],
    transaction?: Sequelize.Transaction
  ) => Promise<Vendors[]>;
}

export const IVendorServiceProivder = "IVendorServiceProivder";
