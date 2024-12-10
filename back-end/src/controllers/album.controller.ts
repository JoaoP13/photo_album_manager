import { Request, Response } from 'express';
import BasicController from './basic.controller';
import AlbumService from '../services/album.service';
import { Album } from '../database/models/Album';

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
      this.response.status(err.status || 400).send({
        message: 'Ocorreu um erro ao listar os dados.',
      });

      return [];
    }
  }

  async getById(): Promise<Album[] | undefined> {
    const { id } = this.request.params;

    try {
      const result: Album[] | undefined = await this.albumService.getById(id);

      this.response.status(200).send(result);

      return result;
    } catch (err: any) {
      this.response.status(err.status || 400).send({
        message: 'Ocorreu um erro ao listar os dados.',
      });

      return;
    }
  }
}

export default AlbumController;
