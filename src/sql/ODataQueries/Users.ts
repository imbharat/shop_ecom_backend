import { OData } from "../../types/OData";

const UserODataCommon = `FROM users
INNER JOIN users users_created_by ON users_created_by.user_id = users.created_by 
INNER JOIN users users_modified_by ON users_modified_by.user_id = users.modified_by
`;

const UserODataExport = `SELECT users.user_id AS user_id,
users.user_name AS user_name,
users.first_name AS first_name,
users.last_name AS last_name,
users.display_name AS display_name,
users.email AS email,
users.phone AS phone,
users_created_by.user_name AS created_by,
users_modified_by.user_name AS modified_by,
users.created_at AS created_on,
users.updated_at AS modified_on
${UserODataCommon}`;

export const userODataCount = ($filter: string) => `
    SELECT COUNT(1) ${UserODataCommon} 
    ${!!$filter ? `WHERE ${$filter}` : ``};
`;

export const userOData = (odata: OData) => {
  const { $select, $filter, $orderby, $skip, $top } = odata;
  return `SELECT ${!!$select ? $select : `*`} ${UserODataCommon} 
    ${!!$filter ? `WHERE ${$filter}` : ``}
    ${
      !!$orderby
        ? `ORDER BY ${$orderby}`
        : !!$skip
        ? `ORDER BY users.created_at desc`
        : ``
    } 
    ${!!$top ? `LIMIT ${$top}` : ``}
    ${!!$skip ? `OFFSET ${$skip}` : ``};
  `;
};

export const userODataExport = (odata: OData) => {
  const { $filter, $orderby } = odata;
  return `${UserODataExport} 
    ${!!$filter ? `WHERE ${$filter}` : ``}
    ${!!$orderby ? `ORDER BY ${$orderby}` : ``};
  `;
};
