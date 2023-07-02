import { OData } from "../../types/OData";

const ProductODataCommon = `FROM products 
INNER JOIN users users_created_by ON users_created_by.user_id = products.created_by 
INNER JOIN users users_modified_by ON users_modified_by.user_id = products.modified_by 
LEFT JOIN qc ON qc.qc_id = products.qc 
LEFT JOIN vendors ON vendors.vendor_id = products.vendor 
LEFT JOIN locations ON locations.location_id = products.location 
LEFT JOIN types ON types.type_id = products.type
LEFT JOIN categories ON categories.category_id = products.category`;

export const productODataCount = ($filter: string) => `
    SELECT COUNT(1) ${ProductODataCommon} 
    ${!!$filter ? `WHERE ${$filter}` : ``};
`;

export const productOData = (odata: OData) => {
  const { $select, $filter, $orderby, $skip, $top } = odata;
  return `SELECT ${!!$select ? $select : `*`} ${ProductODataCommon} 
    ${!!$filter ? `WHERE ${$filter}` : ``}
    ${!!$orderby ? `ORDER BY ${$orderby}` : ``} 
    ${!!$top ? `LIMIT ${$top}` : ``}
    ${!!$skip ? `OFFSET ${$skip}` : ``};
  `;
};
