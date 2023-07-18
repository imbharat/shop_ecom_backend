import UpdateProducts from "./UpdateProducts";

type BulkUpdateProducts = UpdateProducts & {
  product_id: number;
};

export default BulkUpdateProducts;
