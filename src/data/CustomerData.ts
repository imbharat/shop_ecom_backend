import Customers from "../entities/Customers";
import { injectable } from "tsyringe";
import ICustomerData from "../interfaces/data-interfaces/ICustomerData";
import BaseData from "./BaseData";
import ImportCutomers from "../models/ImportCustomers";
import Sequelize from "sequelize";

@injectable()
export default class CustomerData
  extends BaseData<Customers>
  implements ICustomerData
{
  constructor() {
    super(Customers);
  }
  import = async (
    customers: ImportCutomers[],
    transaction?: Sequelize.Transaction
  ) => {
    return await Customers.bulkCreate(customers, {
      updateOnDuplicate: ["customer_name"],
      transaction: transaction,
    });
  };
}
