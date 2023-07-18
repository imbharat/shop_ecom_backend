import { Router } from "express";
import container from "../../container/Container";
import UserController from "../../controllers/UserController";
import {
  userOData,
  userODataCount,
  userODataExport,
} from "../../sql/ODataQueries/Users";

const userRouter = Router();
const userController = container.resolve(UserController);

userRouter.get("/", (req: Request, res: Response) =>
  userController.getOData(req, res, userOData, userODataCount)
);

userRouter.get("/export", (req: Request, res: Response) =>
  userController.getOData(req, res, userODataExport, null)
);

export default userRouter;
