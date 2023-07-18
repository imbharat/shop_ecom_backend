import { Router } from "express";
import productODataRouter from "./Product/ProductODataRoutes";
import vendorODataRouter from "./Vendor/VendorODataRoutes";
import locationODataRouter from "./Location/LocationODataRoutes";
import orderODataRouter from "./Order/OrderODataRoutes";
import customerODataRouter from "./Customer/CustomerODataRoutes";
import userODataRouter from "./User/UserODataRoutes";

const router = Router();

router.use("/products", productODataRouter);

router.use("/vendors", vendorODataRouter);

router.use("/locations", locationODataRouter);

router.use("/orders", orderODataRouter);

router.use("/customers", customerODataRouter);

router.use("/users", userODataRouter);

export default router;
