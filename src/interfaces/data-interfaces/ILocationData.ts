import Locations from "../../entities/Locations";
import IBaseData from "./IBaseData";

export default interface ILocationData extends IBaseData<Locations> {}

export const ILocationDataProivder = "ILocationDataProivder";
