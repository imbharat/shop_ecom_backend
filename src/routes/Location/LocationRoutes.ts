import { Router } from "express";
import container from "../../container/Container";
import LocationController from "../../controllers/LocationController";

const locationRouter = Router();
const locationController = container.resolve(LocationController);

locationRouter.get("/", locationController.get);

locationRouter.get("/:location_id", locationController.getById);

locationRouter.post("/", locationController.add);

locationRouter.put("/:location_id", locationController.update);

locationRouter.delete("/:location_id", locationController.delete);

export default locationRouter;
