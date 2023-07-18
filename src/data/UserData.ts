import Users from "../entities/Users";
import { injectable } from "tsyringe";
import IUserData from "../interfaces/data-interfaces/IUserData";
import BaseData from "./BaseData";

@injectable()
export default class UserData extends BaseData<Users> implements IUserData {
  constructor() {
    super(Users);
  }
}
