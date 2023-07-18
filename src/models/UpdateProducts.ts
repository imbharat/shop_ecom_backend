type UpdateProducts = {
  product_name?: string;
  cost_price?: number;
  sell_price?: number;
  type?: number;
  category?: number;
  barcode?: string;
  vendor?: number;
  imei?: string;
  physical_qc?: number;
  screen_qc?: number;
  ram?: number;
  storage?: number;
  location?: number;
  status?: number;
  order_id?: number;
};

export default UpdateProducts;
