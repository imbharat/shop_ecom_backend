import { Router } from "express";
import container from "../../container/Container";
import ProductController from "../../controllers/ProductController";

const productRouter = Router();
const productController = container.resolve(ProductController);

productRouter.get("/", productController.get);

productRouter.get("/:product_id", productController.getById);

productRouter.post("/", productController.add);

productRouter.post("/import", productController.import);

productRouter.put("/:product_id", productController.update);

productRouter.delete("/:product_id", productController.delete);

export default productRouter;
