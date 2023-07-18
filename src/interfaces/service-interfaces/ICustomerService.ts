import Sequelize from "sequelize";
import Customers from "../../entities/Customers";
import ImportCutomers from "../../models/ImportCustomers";
import IBaseService from "./IBaseService";

export interface ICustomerService extends IBaseService {
  import: (
    customers: ImportCutomers[],
    transaction?: Sequelize.Transaction
  ) => Promise<Customers[]>;
}

export const ICustomerServiceProivder = "ICustomerServiceProivder";
