import { Router } from "express";
import container from "../../container/Container";
import CustomerController from "../../controllers/CustomerController";
import {
  customerOData,
  customerODataCount,
  customerODataExport,
} from "../../sql/ODataQueries/Customers";

const customerRouter = Router();
const customerController = container.resolve(CustomerController);

customerRouter.get("/", (req: Request, res: Response) =>
  customerController.getOData(req, res, customerOData, customerODataCount)
);

customerRouter.get("/export", (req: Request, res: Response) =>
  customerController.getOData(req, res, customerODataExport, null)
);

export default customerRouter;
