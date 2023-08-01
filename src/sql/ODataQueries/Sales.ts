import { ProductStatus } from "../../enums/ProductStatus";
import { OData } from "../../types/OData";

const SalesODataCommon = `FROM products 
LEFT JOIN qc physical_qc ON physical_qc.qc_id = products.physical_qc
LEFT JOIN qc screen_qc ON screen_qc.qc_id = products.screen_qc 
LEFT JOIN vendors ON vendors.vendor_id = products.vendor 
LEFT JOIN locations ON locations.location_id = products.location 
LEFT JOIN types ON types.type_id = products.type
LEFT JOIN categories ON categories.category_id = products.category
LEFT JOIN orders ON orders.order_id = products.order_id
LEFT JOIN customers ON customers.customer_id = orders.customer
LEFT JOIN users ON users.user_id = orders.created_by 
WHERE products.status = ${ProductStatus.Sold}`;

const SalesODataExport = `SELECT products.product_id AS product_id, 
products.cost_price AS cost_price, 
products.sell_price AS sell_price, 
products.order_id AS order_id,
customers.customer_name AS customer,
products.product_name AS product_name,
types.type_name AS type,
categories.category_name AS category,
products.barcode AS barcode,
vendors.vendor_name AS vendor,
products.imei AS imei,
physical_qc.qc_name AS physical_qc,
screen_qc.qc_name AS screen_qc,
products.status AS status,
users.user_name AS sold_by,
orders.created_at AS sold_on
${SalesODataCommon}`;

export const saleODataCount = ($filter: string) => `
  SELECT COUNT(1) ${SalesODataCommon} 
  ${!!$filter ? `AND ${$filter}` : ``};
`;

export const saleOData = (odata: OData) => {
  const { $select, $filter, $orderby, $skip, $top } = odata;
  return `SELECT ${!!$select ? $select : `*`} ${SalesODataCommon} 
    ${!!$filter ? `AND ${$filter}` : ``}
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

export const saleODataExport = (odata: OData) => {
  const { $filter, $orderby } = odata;
  return `${SalesODataExport} 
    ${!!$filter ? `AND ${$filter}` : ``}
    ${!!$orderby ? `ORDER BY ${$orderby}` : ``};
  `;
};
