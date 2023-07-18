import { Router } from "express";
import container from "../../container/Container";
import UserController from "../../controllers/UserController";

const userRouter = Router();
const userController = container.resolve(UserController);

userRouter.get("/", userController.get);

userRouter.get("/:user_id", userController.getById);

userRouter.post("/", userController.add);

userRouter.put("/:user_id", userController.update);

userRouter.delete("/:user_id", userController.delete);

export default userRouter;
