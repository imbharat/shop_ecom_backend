import { ProductStatus } from "../../enums/ProductStatus";
import { OData } from "../../types/OData";

const OrderProductODataCommon = `FROM products 
LEFT JOIN qc physical_qc ON physical_qc.qc_id = products.physical_qc
LEFT JOIN qc screen_qc ON screen_qc.qc_id = products.screen_qc 
LEFT JOIN vendors ON vendors.vendor_id = products.vendor 
LEFT JOIN types ON types.type_id = products.type
LEFT JOIN categories ON categories.category_id = products.category
WHERE products.status = ${ProductStatus.Sold}`;

const OrderProductODataExport = `SELECT products.product_id AS product_id, 
products.cost_price AS cost_price, 
products.sell_price AS sell_price,
products.product_name AS product_name,
products.order_id AS order_id,
types.type_name AS type,
categories.category_name AS category,
products.barcode AS barcode,
vendors.vendor_name AS vendor,
products.imei AS imei,
physical_qc.qc_name AS physical_qc,
screen_qc.qc_name AS screen_qc,
products.created_at AS created_on,
products.updated_at AS modified_on 
${OrderProductODataCommon}`;

export const orderProductsODataCount = (
  $filter: string,
  paramsWhereClaue: string
) => {
  return `SELECT COUNT(1) ${OrderProductODataCommon} 
    ${!!$filter ? `AND ${$filter}` : ``}
    ${!!paramsWhereClaue ? `AND ${paramsWhereClaue}` : ``};
  `;
};

export const orderProductsOData = (odata: OData, paramsWhereClaue: string) => {
  const { $select, $filter, $orderby, $skip, $top } = odata;
  return `SELECT ${!!$select ? $select : `*`} ${OrderProductODataCommon} 
    ${!!$filter ? `AND ${$filter}` : ``}
    ${!!paramsWhereClaue ? `AND ${paramsWhereClaue}` : ``}
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

export const orderProductsODataExport = (
  odata: OData,
  paramsWhereClaue: string
) => {
  const { $filter, $orderby } = odata;
  return `${OrderProductODataExport} 
    ${!!$filter ? `AND ${$filter}` : ``}
    ${!!paramsWhereClaue ? `AND ${paramsWhereClaue}` : ``}
    ${!!$orderby ? `ORDER BY ${$orderby}` : ``};
  `;
};
