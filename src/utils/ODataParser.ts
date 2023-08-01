import { injectable } from "tsyringe";
import { parse } from "odata-parser";
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
    $count: true,
  };

  OperatorMap = Object.freeze({
    and: "AND",
    or: "OR",
    eq: "=",
    ne: "<>",
    lt: "<",
    gt: ">",
    le: "<=",
    ge: ">=",
    like_pre: "LIKE '%",
    like_post: "%'",
    includes_pre: "IN (",
    includes_post: ")",
  });

  parseToSQL = (
    params,
    query,
    odata: (odata: OData, paramsWhereClaue: string) => string,
    odata_count: (where: string, paramsWhereClaue: string) => string
  ) => {
    // set all segments blank for each request
    this.odata = {
      $select: "",
      $filter: "",
      $orderby: "",
      $top: "",
      $skip: "",
      $count: true,
    };
    //route params to be added as where clause
    let paramsWhereClaue = "";
    if (params) {
      for (let pName in params) {
        paramsWhereClaue += `${pName} = ${params[pName]} and `;
      }
      paramsWhereClaue = paramsWhereClaue.substring(
        0,
        paramsWhereClaue.lastIndexOf(" and")
      );
    }

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
      // create sql where clause from filter
      const where = this.parseSQLWhere(filter, "", true);
      // sanitize filter to avoid sql injection
      const sFilter = this.sanitizeFilter(where);
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
    // count
    if (!!query.$count) {
      this.odata.$count = query.$count === "true";
    }

    return {
      countQuery: this.odata.$count
        ? odata_count?.(this.odata.$filter, paramsWhereClaue)
        : "",
      odataQuery: odata?.(this.odata, paramsWhereClaue),
    };
  };

  private parseFilter = (odataFilter: string) => {
    try {
      const filter = parse(odataFilter, "filterExpr");
      return filter;
    } catch (ex) {
      return null;
    }
  };

  private sanitizeFilter = (parsedFiilter: string) => {
    return parsedFiilter;
  };

  private parseSQLWhere = (
    filter: any,
    where: string,
    appendQuotes: boolean = true
  ) => {
    switch (filter.type) {
      case "and":
      case "or":
      case "lt":
      case "gt":
      case "le":
      case "ge":
        where += `(`;
        where = this.parseSQLWhere(filter.left, where);
        where = `${where} ${this.operator(filter.type)} `;
        where = this.parseSQLWhere(filter.right, where);
        where += `)`;
        break;
      case "eq":
      case "ne":
        let isEqNeqOp = true;
        if (filter?.right?.type === "literal") {
          if (
            Array.isArray(filter?.right?.value) &&
            filter?.right?.value?.includes("null")
          ) {
            isEqNeqOp = false;
          }
        }
        where += `(`;
        where = this.parseSQLWhere(filter.left, where);
        where = `${where} ${this.operator(filter.type, isEqNeqOp)} `;
        where = this.parseSQLWhere(filter.right, where);
        where += `)`;
        break;
      case "property":
        where += filter.name;
        break;
      case "literal":
        if (typeof filter?.value === "string" && appendQuotes) {
          where += `'${filter.value}'`;
        } else if (
          Array.isArray(filter?.value) &&
          filter.value.includes("null")
        ) {
          where += "NULL";
        } else {
          where += filter.value;
        }
        break;
      case "functioncall":
        switch (filter.func) {
          case "contains":
            where += `(`;
            where = this.parseSQLWhere(filter.args[0], where, false);
            where = `${where} ${this.operator("like_pre")}`;
            where = this.parseSQLWhere(filter.args[1], where, false);
            where += `${this.operator("like_post")})`;
            break;
          case "includes":
            where += `(`;
            where = this.parseSQLWhere(filter.args[0], where, false);
            where = `${where} ${this.operator("includes_pre")}`;
            where = this.parseSQLWhere(filter.args[1], where, false);
            where += `${this.operator("includes_post")})`;
            break;
        }
        break;
    }

    return where;
  };

  private operator = (code: string, isEqNeqOp: boolean = true) => {
    if (!isEqNeqOp) {
      if (code === "eq") return "IS";
      else if (code === "ne") return "IS NOT";
    }
    return this.OperatorMap[code];
  };
}
