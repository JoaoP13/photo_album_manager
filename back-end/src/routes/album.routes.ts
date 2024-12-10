import express from 'express';
import AlbumController from '../controllers/album.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const albumRouter: express.Router = express.Router();

albumRouter.get(
  '/',
  authMiddleware,
  (request: express.Request, response: express.Response): any => {
    const albumController: AlbumController = new AlbumController(
      request,
      response,
    );

    albumController.listAlbums();
  },
);

albumRouter.get(
  '/:id',
  authMiddleware,
  (request: express.Request, response: express.Response): any => {
    const controller: AlbumController = new AlbumController(request, response);
    controller.getById();
  },
);

export default albumRouter;
