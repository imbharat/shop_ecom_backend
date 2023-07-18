import { Router } from "express";
import container from "../../container/Container";
import LocationController from "../../controllers/LocationController";
import {
  locationOData,
  locationODataCount,
  locationODataExport,
} from "../../sql/ODataQueries/Locations";

const locationRouter = Router();
const locationController = container.resolve(LocationController);

locationRouter.get("/", (req: Request, res: Response) =>
  locationController.getOData(req, res, locationOData, locationODataCount)
);

locationRouter.get("/export", (req: Request, res: Response) =>
  locationController.getOData(req, res, locationODataExport, null)
);

export default locationRouter;
