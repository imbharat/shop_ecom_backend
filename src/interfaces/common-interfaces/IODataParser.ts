import { OData } from "../../types/OData";

export default interface IODataParser {
  odata: OData;
  parseToSQL(
    params: Object,
    queryObj: OData,
    odata: (odata: OData, paramsWhereClaue: string) => string,
    odata_count: ($filter: string, paramsWhereClaue: string) => string
  ): {
    countQuery: string;
    odataQuery: string;
  };
}

export const IODataParserProivder = "IODataParserProivder";
