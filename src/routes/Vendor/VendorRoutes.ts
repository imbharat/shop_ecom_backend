import { Router } from "express";
import container from "../../container/Container";
import VendorController from "../../controllers/VendorController";

const vendorRouter = Router();
const vendorController = container.resolve(VendorController);

vendorRouter.get("/", vendorController.get);

vendorRouter.get("/:vendor_id", vendorController.getById);

vendorRouter.post("/", vendorController.add);

vendorRouter.put("/:vendor_id", vendorController.update);

vendorRouter.delete("/:vendor_id", vendorController.delete);

export default vendorRouter;
