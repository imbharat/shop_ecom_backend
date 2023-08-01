import { ProductStatus } from "../../enums/ProductStatus";
import { OData } from "../../types/OData";

const SelectMin = `products.product_id AS product_id, 
products.product_name AS product_name,
products.imei AS imei,
products.barcode AS barcode,
products.cost_price AS cost_price, 
null AS sell_price, 
types.type_name AS type,
categories.category_name AS category,
vendors.vendor_name AS vendor,
physical_qc.qc_name AS physical_qc,
screen_qc.qc_name AS screen_qc,
locations.location_name AS location,
products.status AS status
`;

const ProductODataCommon = `FROM products 
INNER JOIN users users_created_by ON users_created_by.user_id = products.created_by 
INNER JOIN users users_modified_by ON users_modified_by.user_id = products.modified_by 
LEFT JOIN qc physical_qc ON physical_qc.qc_id = products.physical_qc
LEFT JOIN qc screen_qc ON screen_qc.qc_id = products.screen_qc 
LEFT JOIN vendors ON vendors.vendor_id = products.vendor 
LEFT JOIN locations ON locations.location_id = products.location 
LEFT JOIN types ON types.type_id = products.type
LEFT JOIN categories ON categories.category_id = products.category
WHERE products.status IS DISTINCT FROM ${ProductStatus.Sold}`;

const ProductODataExport = `SELECT ${SelectMin},
null AS customer_name,
users_created_by.user_name AS created_by,
users_modified_by.user_name AS modified_by,
products.created_at AS created_on,
products.updated_at AS modified_on
${ProductODataCommon}`;

export const productODataCount = ($filter: string) => `
  SELECT COUNT(1) ${ProductODataCommon} 
  ${!!$filter ? `AND ${$filter}` : ``};
`;

export const productOData = (odata: OData) => {
  const { $select, $filter, $orderby, $skip, $top } = odata;
  return `SELECT ${!!$select ? $select : SelectMin} ${ProductODataCommon} 
    ${!!$filter ? `AND ${$filter}` : ``}
    ${
      !!$orderby
        ? `ORDER BY ${$orderby}`
        : !!$skip
        ? `ORDER BY products.created_at desc`
        : ``
    } 
    ${!!$top ? `LIMIT ${$top}` : ``}
    ${!!$skip ? `OFFSET ${$skip}` : ``};
  `;
};

export const productODataExport = (odata: OData) => {
  const { $filter, $orderby } = odata;
  return `${ProductODataExport} 
    ${!!$filter ? `AND ${$filter}` : ``}
    ${!!$orderby ? `ORDER BY ${$orderby}` : ``};
  `;
};
