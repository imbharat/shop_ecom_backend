import { OData } from "../../types/OData";

const LocationODataCommon = `FROM locations 
INNER JOIN users users_created_by ON users_created_by.user_id = locations.created_by 
INNER JOIN users users_modified_by ON users_modified_by.user_id = locations.modified_by 
`;

const LocationODataExport = `SELECT locations.location_id AS location_id,
locations.location_name AS location_name,
locations.address AS address,
locations.city AS city,
locations.pincode AS pincode,
locations.state AS state,
locations.country AS country,
users_created_by.user_name AS created_by,
users_modified_by.user_name AS modified_by,
locations.created_at AS created_on,
locations.updated_at AS modified_on
${LocationODataCommon}`;

export const locationODataCount = ($filter: string) => `
    SELECT COUNT(1) ${LocationODataCommon} 
    ${!!$filter ? `WHERE ${$filter}` : ``};
`;

export const locationOData = (odata: OData) => {
  const { $select, $filter, $orderby, $skip, $top } = odata;
  return `SELECT ${!!$select ? $select : `*`} ${LocationODataCommon} 
    ${!!$filter ? `WHERE ${$filter}` : ``}
    ${
      !!$orderby
        ? `ORDER BY ${$orderby}`
        : !!$skip
        ? `ORDER BY locations.created_at desc`
        : ``
    } 
    ${!!$top ? `LIMIT ${$top}` : ``}
    ${!!$skip ? `OFFSET ${$skip}` : ``};
  `;
};

export const locationODataExport = (odata: OData) => {
  const { $filter, $orderby } = odata;
  return `${LocationODataExport} 
    ${!!$filter ? `WHERE ${$filter}` : ``}
    ${!!$orderby ? `ORDER BY ${$orderby}` : ``};
  `;
};
