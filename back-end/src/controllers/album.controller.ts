import { Request, Response } from 'express';
import BasicController from './basic.controller';
import AlbumService from '../services/album.service';
import { Album } from '../database/models/Album';

type CreateAlbumPayload = {
  title: string;
  idUser: string;
};
class AlbumController extends BasicController {
  albumService: AlbumService;

  public constructor(req: Request, res: Response) {
    super(req, res);
    this.albumService = new AlbumService();
  }

  async listAlbums(): Promise<Album[] | undefined> {
    try {
      const result: Album[] | undefined = await this.albumService.list();

      this.response.status(200).send(result);

      return result;
    } catch (err: any) {
      this.response.status(err.status || 400).send([
        {
          message: 'Ocorreu um erro ao listar os dados.',
        },
      ]);

      return [];
    }
  }

  async getByIdUser(): Promise<Album[] | undefined> {
    const { id } = this.request.params;

    try {
      const result: Album[] | undefined =
        await this.albumService.getByIdUser(id);

      this.response.status(200).send(result);

      return result;
    } catch (err: any) {
      this.response.status(err.status || 400).send({
        message: 'Ocorreu um erro ao listar os dados.',
      });

      return;
    }
  }

  async delete(payload: any): Promise<void | object> {
    try {
      await this.albumService.delete(payload.id);

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
    const { title, idUser }: CreateAlbumPayload = this.request.body.params;

    try {
      await this.albumService.create(title, idUser);

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

export default AlbumController;
