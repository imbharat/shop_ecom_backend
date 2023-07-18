import { Router } from "express";
import productRouter from "./Product/ProductRoutes";
import vendorRouter from "./Vendor/VendorRoutes";
import locationRouter from "./Location/LocationRoutes";
import orderRouter from "./Order/OrderRoutes";
import customerRouter from "./Customer/CustomerRoutes";
import userRouter from "./User/UserRoutes";

const router = Router();

router.use("/products", productRouter);

router.use("/vendors", vendorRouter);

router.use("/locations", locationRouter);

router.use("/orders", orderRouter);

router.use("/customers", customerRouter);

router.use("/users", userRouter);

export default router;
