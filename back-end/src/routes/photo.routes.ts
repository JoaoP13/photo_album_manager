import express from 'express';
import PhotoController from '../controllers/photo.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const photoRouter: express.Router = express.Router();

photoRouter.get(
  '/:idAlbum',
  authMiddleware,
  (request: express.Request, response: express.Response): any => {
    const photoController: PhotoController = new PhotoController(
      request,
      response,
    );
    photoController.getById();
  },
);

photoRouter.delete(
  '/',
  authMiddleware,
  (request: express.Request, response: express.Response): any => {
    const photoController: PhotoController = new PhotoController(
      request,
      response,
    );

    photoController.delete({
      idAlbum: request.query.idAlbum,
      url: request.query.url,
    });
  },
);

export default photoRouter;
