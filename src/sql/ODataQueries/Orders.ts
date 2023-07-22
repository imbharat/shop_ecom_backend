import { OData } from "../../types/OData";

const OrderODataCommon = `FROM orders
INNER JOIN users users_created_by ON users_created_by.user_id = orders.created_by 
INNER JOIN users users_modified_by ON users_modified_by.user_id = orders.modified_by 
LEFT JOIN customers ON customers.customer_id = orders.customer
`;

const OrderODataExport = `SELECT orders.order_id AS order_id,
orders.net AS net,
customers.customer_name AS customer,
users_created_by.user_name AS created_by,
users_modified_by.user_name AS modified_by,
orders.created_at AS created_on,
orders.updated_at AS modified_on
${OrderODataCommon}`;

export const orderODataCount = ($filter: string) => `
    SELECT COUNT(1) ${OrderODataCommon} 
    ${!!$filter ? `WHERE ${$filter}` : ``};
`;

export const orderOData = (odata: OData) => {
  const { $select, $filter, $orderby, $skip, $top } = odata;
  return `SELECT ${!!$select ? $select : `*`} ${OrderODataCommon} 
    ${!!$filter ? `WHERE ${$filter}` : ``}
    ${
      !!$orderby
        ? `ORDER BY ${$orderby}`
        : !!$skip
        ? `ORDER BY orders.created_at desc`
        : ``
    } 
    ${!!$top ? `LIMIT ${$top}` : ``}
    ${!!$skip ? `OFFSET ${$skip}` : ``};
  `;
};

export const orderODataExport = (odata: OData) => {
  const { $filter, $orderby } = odata;
  return `${OrderODataExport} 
    ${!!$filter ? `WHERE ${$filter}` : ``}
    ${!!$orderby ? `ORDER BY ${$orderby}` : ``};
  `;
};
