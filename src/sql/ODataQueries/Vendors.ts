import { OData } from "../../types/OData";

const SelectMin = `vendors.vendor_id AS vendor_id,
vendors.vendor_name AS vendor_name,
vendors.address AS address,
vendors.city AS city,
vendors.pincode AS pincode,
vendors.state AS state,
vendors.country AS country,
vendors.email AS email,
vendors.phone AS phone`;

const VendorODataCommon = `FROM vendors 
INNER JOIN users users_created_by ON users_created_by.user_id = vendors.created_by 
INNER JOIN users users_modified_by ON users_modified_by.user_id = vendors.modified_by 
`;

const VendorODataExport = `SELECT ${SelectMin},
users_created_by.user_name AS created_by,
users_modified_by.user_name AS modified_by,
vendors.created_at AS created_on,
vendors.updated_at AS modified_on
${VendorODataCommon}`;

export const vendorODataCount = ($filter: string) => `
  SELECT COUNT(1) ${VendorODataCommon} 
  ${!!$filter ? `WHERE ${$filter}` : ``};
`;

export const vendorOData = (odata: OData) => {
  const { $select, $filter, $orderby, $skip, $top } = odata;
  return `SELECT ${!!$select ? $select : SelectMin} ${VendorODataCommon} 
    ${!!$filter ? `WHERE ${$filter}` : ``}
    ${
      !!$orderby
        ? `ORDER BY ${$orderby}`
        : !!$skip
        ? `ORDER BY vendors.created_at desc`
        : ``
    } 
    ${!!$top ? `LIMIT ${$top}` : ``}
    ${!!$skip ? `OFFSET ${$skip}` : ``};
  `;
};

export const vendorODataExport = (odata: OData) => {
  const { $filter, $orderby } = odata;
  return `${VendorODataExport} 
    ${!!$filter ? `WHERE ${$filter}` : ``}
    ${!!$orderby ? `ORDER BY ${$orderby}` : ``};
  `;
};
