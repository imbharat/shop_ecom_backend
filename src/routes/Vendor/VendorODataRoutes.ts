import { Router } from "express";
import container from "../../container/Container";
import VendorController from "../../controllers/VendorController";

const vendorRouter = Router();
const vendorController = container.resolve(VendorController);

vendorRouter.get("/", vendorController.getOData);

export default vendorRouter;
