import { OData } from "../../types/OData";

const SelectMin = `customers.customer_id AS customer_id,
customers.customer_name AS customer_name,
customers.address AS address,
customers.city AS city,
customers.pincode AS pincode,
customers.state AS state,
customers.country AS country,
customers.email AS email,
customers.phone AS phone`;

const CustomerODataCommon = `FROM customers 
INNER JOIN users users_created_by ON users_created_by.user_id = customers.created_by 
INNER JOIN users users_modified_by ON users_modified_by.user_id = customers.modified_by 
`;

const CustomerODataExport = `SELECT ${SelectMin},
users_created_by.user_name AS created_by,
users_modified_by.user_name AS modified_by,
customers.created_at AS created_on,
customers.updated_at AS modified_on
${CustomerODataCommon}`;

export const customerODataCount = ($filter: string) => `
  SELECT COUNT(1) ${CustomerODataCommon} 
  ${!!$filter ? `WHERE ${$filter}` : ``};
`;

export const customerOData = (odata: OData) => {
  const { $select, $filter, $orderby, $skip, $top } = odata;
  return `SELECT ${!!$select ? $select : SelectMin} ${CustomerODataCommon} 
    ${!!$filter ? `WHERE ${$filter}` : ``}
    ${
      !!$orderby
        ? `ORDER BY ${$orderby}`
        : !!$skip
        ? `ORDER BY customers.created_at desc`
        : ``
    } 
    ${!!$top ? `LIMIT ${$top}` : ``}
    ${!!$skip ? `OFFSET ${$skip}` : ``};
  `;
};

export const customerODataExport = (odata: OData) => {
  const { $filter, $orderby } = odata;
  return `${CustomerODataExport} 
    ${!!$filter ? `WHERE ${$filter}` : ``}
    ${!!$orderby ? `ORDER BY ${$orderby}` : ``};
  `;
};
