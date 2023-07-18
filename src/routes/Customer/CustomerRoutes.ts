import { Router } from "express";
import container from "../../container/Container";
import CustomerController from "../../controllers/CustomerController";

const customerRouter = Router();
const customerController = container.resolve(CustomerController);

customerRouter.get("/", customerController.get);

customerRouter.get("/:customer_id", customerController.getById);

customerRouter.post("/", customerController.add);

customerRouter.put("/:customer_id", customerController.update);

customerRouter.delete("/:customer_id", customerController.delete);

export default customerRouter;
