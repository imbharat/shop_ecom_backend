import { Router } from "express";
import container from "../../container/Container";
import OrderController from "../../controllers/OrderController";
import {
  orderOData,
  orderODataCount,
  orderODataExport,
} from "../../sql/ODataQueries/Orders";
import {
  orderProductsOData,
  orderProductsODataCount,
  orderProductsODataExport,
} from "../../sql/ODataQueries/OrderProducts";

const orderRouter = Router();
const orderController = container.resolve(OrderController);

orderRouter.get("/", (req: Request, res: Response) =>
  orderController.getOData(req, res, orderOData, orderODataCount)
);

orderRouter.get("/export", (req: Request, res: Response) =>
  orderController.getOData(req, res, orderODataExport, null)
);

orderRouter.get("/:order_id/products", (req: Request, res: Response) =>
  orderController.getOData(
    req,
    res,
    orderProductsOData,
    orderProductsODataCount
  )
);

orderRouter.get("/:order_id/products/export", (req: Request, res: Response) =>
  orderController.getOData(req, res, orderProductsODataExport, null)
);

export default orderRouter;
