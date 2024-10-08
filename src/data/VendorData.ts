import Sequelize from "sequelize";
import Vendors from "../entities/Vendors";
import { injectable } from "tsyringe";
import IVendorData from "../interfaces/data-interfaces/IVendorData";
import BaseData from "./BaseData";
import ImportVendors from "../models/ImportVendors";

@injectable()
export default class VendorData
  extends BaseData<Vendors>
  implements IVendorData
{
  constructor() {
    super(Vendors);
  }
  import = async (
    vendors: ImportVendors[],
    transaction?: Sequelize.Transaction
  ) => {
    return await Vendors.bulkCreate(vendors, {
      updateOnDuplicate: ["vendor_name"],
      transaction: transaction,
    });
  };
}
