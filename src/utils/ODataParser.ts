import { injectable } from "tsyringe";
import IODataParser from "../interfaces/common-interfaces/IODataParser";
import { OData } from "../types/OData";

@injectable()
export default class ODataParser implements IODataParser {
  odata: OData = {
    $select: "",
    $filter: "",
    $orderby: "",
    $top: "",
    $skip: "",
  };

  constructor() {}

  parseToSQL = (
    query,
    odata: (odata: OData) => string,
    odata_count: (where: string) => string
  ) => {
    // select fields
    if (!!query.$select) {
      const attributes = query.$select.split(",");
      let select = "";
      for (let itr = 0; itr < attributes.length; itr++) {
        select += `${attributes[itr]} as "${attributes[itr]}", `;
      }
      this.odata.$select = select.slice(0, -2);
    }
    // where clause
    if (!!query.$filter) {
      // parse filter to convert it to sql where clause
      const filter = this.parseFilter(query.$filter);
      // sanitize filter to avoid sql injection
      const sFilter = this.sanitizeFilter(filter);
      this.odata.$filter = sFilter;
    }
    // order by condition
    if (!!query.$orderby) {
      this.odata.$orderby = query.$orderby;
    }
    // page size
    if (!!query.$top) {
      this.odata.$top = query.$top;
    }
    // page
    if (!!query.$skip) {
      this.odata.$skip = query.$skip;
    }

    return {
      countQuery: odata_count(this.odata.$filter),
      odataQuery: odata(this.odata),
    };
  };

  private parseFilter = (odataFilter: string) => {
    let parsedFilter = "";
    return parsedFilter;
  };

  private sanitizeFilter = (parsedFiilter: string) => {
    let sanitizedFilter = "";
    return sanitizedFilter;
  };
}
