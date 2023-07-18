import { Router } from "express";
import container from "../../container/Container";
import OrderController from "../../controllers/OrderController";

const orderRouter = Router();
const orderController = container.resolve(OrderController);

orderRouter.get("/", orderController.get);

orderRouter.get("/:order_id", orderController.getById);

orderRouter.post("/", orderController.add);

orderRouter.put("/:order_id", orderController.update);

orderRouter.delete("/:order_id", orderController.delete);

export default orderRouter;
