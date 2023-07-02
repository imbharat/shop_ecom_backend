import { Router } from "express";
import productRouter from "./Product/ProductRoutes";
import vendorRouter from "./Vendor/VendorRoutes";

const router = Router();

router.use("/products", productRouter);

router.use("/vendors", vendorRouter);

export default router;
