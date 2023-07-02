import { Request, Response, Router } from "express";
import container from "../../container/Container";
import ProductController from "../../controllers/ProductController";
import {
  productOData,
  productODataCount,
} from "../../sql/ODataQueries/Products";

const productRouter = Router();
const productController = container.resolve(ProductController);

productRouter.get("/", (req: Request, res: Response) =>
  productController.getOData(req, res, productOData, productODataCount)
);

export default productRouter;
