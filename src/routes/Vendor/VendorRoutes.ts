import { Router } from "express";
import container from "../../container/Container";
import VendorController from "../../controllers/VendorController";

const vendorRouter = Router();
const vendorController = container.resolve(VendorController);

vendorRouter.get("/", vendorController.get);

vendorRouter.get("/:id", vendorController.getById);

vendorRouter.post("/:id", vendorController.add);

vendorRouter.put("/:id", vendorController.update);

vendorRouter.delete("/:id", vendorController.delete);

export default vendorRouter;
