import express from 'express';
import UserController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRouter: express.Router = express.Router();

userRouter.get(
  '/',
  authMiddleware,
  (request: express.Request, response: express.Response): any => {
    const userController: UserController = new UserController(
      request,
      response,
    );

    userController.listUsers();
  },
);

export default userRouter;
