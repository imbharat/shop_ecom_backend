import { Router } from "express";
import container from "../../container/Container";
import VendorController from "../../controllers/VendorController";
import {
  vendorOData,
  vendorODataCount,
  vendorODataExport,
} from "../../sql/ODataQueries/Vendors";

const vendorRouter = Router();
const vendorController = container.resolve(VendorController);

vendorRouter.get("/", (req: Request, res: Response) =>
  vendorController.getOData(req, res, vendorOData, vendorODataCount)
);

vendorRouter.get("/export", (req: Request, res: Response) =>
  vendorController.getOData(req, res, vendorODataExport, null)
);

export default vendorRouter;
