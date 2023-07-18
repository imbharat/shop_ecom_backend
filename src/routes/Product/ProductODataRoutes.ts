import { Request, Response, Router } from "express";
import container from "../../container/Container";
import ProductController from "../../controllers/ProductController";
import {
  productOData,
  productODataCount,
  productODataExport,
} from "../../sql/ODataQueries/Products";
import {
  saleOData,
  saleODataCount,
  saleODataExport,
} from "../../sql/ODataQueries/Sales";

const productRouter = Router();
const productController = container.resolve(ProductController);

productRouter.get("/", (req: Request, res: Response) =>
  productController.getOData(req, res, productOData, productODataCount)
);

productRouter.get("/sales", (req: Request, res: Response) =>
  productController.getOData(req, res, saleOData, saleODataCount)
);

productRouter.get("/export", (req: Request, res: Response) =>
  productController.getOData(req, res, productODataExport, null)
);

productRouter.get("/sales/export", (req: Request, res: Response) =>
  productController.getOData(req, res, saleODataExport, null)
);

export default productRouter;
