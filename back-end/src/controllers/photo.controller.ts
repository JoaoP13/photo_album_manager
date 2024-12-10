import { Request, Response } from 'express';
import BasicController from './basic.controller';
import { Photo } from '../database/models/Photo';
import PhotoService from '../services/photo.service';

type CreatePhotoPayload = {
  title: string;
  idAlbum: string;
  url: string;
  thumbnailUrl: string;
};

class PhotoController extends BasicController {
  photoService: PhotoService;

  public constructor(req: Request, res: Response) {
    super(req, res);
    this.photoService = new PhotoService();
  }

  async getById(): Promise<Photo[] | undefined> {
    const { idAlbum } = this.request.params;

    try {
      const result: Photo[] | undefined =
        await this.photoService.getAllPhotosByIdAlbum(+idAlbum);

      this.response.status(200).send(result);

      return result;
    } catch (err: any) {
      this.response.status(err.status || 400).send([
        {
          message: 'Ocorreu um erro ao listar os dados.',
        },
      ]);

      return;
    }
  }

  async delete(payload: any): Promise<void | object> {
    try {
      await this.photoService.deletePhotoFromAlbum(
        payload.idAlbum,
        payload.url,
      );
      this.response.status(200).send({
        message: 'Sucesso ao excluir o dado',
      });
    } catch (err: any) {
      this.response.status(err.status || 400).send({
        message: 'Ocorreu um erro ao deletar os dados. Contate o suporte',
      });
    }
  }

  async create(): Promise<void | object> {
    const { title, idAlbum, url, thumbnailUrl }: CreatePhotoPayload =
      this.request.body.params;

    try {
      await this.photoService.create(title, idAlbum, url, thumbnailUrl);

      this.response.status(200).send({
        message: 'Sucesso ao excluir o dado',
      });
    } catch (err: any) {
      console.log(err);

      this.response.status(err.status || 400).send({
        message: 'Ocorreu um erro ao salvar os dados. Contate o suporte',
      });
    }
  }
}

export default PhotoController;
