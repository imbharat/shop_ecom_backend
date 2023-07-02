import { OData } from "../../types/OData";

export default interface IODataParser {
  odata: OData;
  parseToSQL(
    queryObj: Object,
    odata: (odata: OData) => string,
    odata_count: ($filter: string) => string
  ): {
    countQuery: string;
    odataQuery: string;
  };
}

export const IODataParserProivder = "IODataParserProivder";
