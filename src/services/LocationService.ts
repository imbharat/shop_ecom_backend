import { injectable, inject } from "tsyringe";
import IODataParser, {
  IODataParserProivder,
} from "../interfaces/common-interfaces/IODataParser";
import ILocationData, {
  ILocationDataProivder,
} from "../interfaces/data-interfaces/ILocationData";
import { ILocationService } from "../interfaces/service-interfaces/ILocationService";
import BaseService from "./BaseService";

@injectable()
export default class LocationService
  extends BaseService
  implements ILocationService
{
  constructor(
    @inject(ILocationDataProivder) iLocationData: ILocationData,
    @inject(IODataParserProivder) iODataParser: IODataParser
  ) {
    super(iLocationData, iODataParser);
  }
}
