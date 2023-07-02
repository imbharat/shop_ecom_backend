import { Router } from "express";
import productODataRouter from "./Product/ProductODataRoutes";
import vendorODataRouter from "./Vendor/VendorODataRoutes";

const router = Router();

router.use("/products", productODataRouter);

router.use("/vendors", vendorODataRouter);

export default router;
