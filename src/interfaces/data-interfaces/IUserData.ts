import Users from "../../entities/Users";
import IBaseData from "./IBaseData";

export default interface IUserData extends IBaseData<Users> {}

export const IUserDataProivder = "IUserDataProivder";
