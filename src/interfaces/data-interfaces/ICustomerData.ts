import Sequelize from "sequelize";
import Customers from "../../entities/Customers";
import ImportCutomers from "../../models/ImportCustomers";
import IBaseData from "./IBaseData";

export default interface ICustomerData extends IBaseData<Customers> {
  import: (
    customers: ImportCutomers[],
    transaction?: Sequelize.Transaction
  ) => Promise<Customers[]>;
}

export const ICustomerDataProivder = "ICustomerDataProivder";
