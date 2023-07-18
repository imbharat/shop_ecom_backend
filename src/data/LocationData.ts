import Locations from "../entities/Locations";
import { injectable } from "tsyringe";
import ILocationData from "../interfaces/data-interfaces/ILocationData";
import BaseData from "./BaseData";

@injectable()
export default class LocationData
  extends BaseData<Locations>
  implements ILocationData
{
  constructor() {
    super(Locations);
  }
}
