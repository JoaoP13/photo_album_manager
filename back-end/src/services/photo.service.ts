import { Database } from 'sqlite3';
import { openSqLiteConnection } from '../database';
import ApiAccessError from '../error/ApiAccessError';
import { Photo } from '../database/models/Photo';

class PhotoService {
  constructor() {}

  async getAllPhotosByIdAlbum(idAlbum: number): Promise<Photo[] | undefined> {
    let db: Database;

    try {
      db = await openSqLiteConnection();

      return new Promise((resolve, reject) => {
        const query =
          'SELECT * FROM Photo WHERE deleted_at IS NULL AND id_album = ?';

        db.all(query, [idAlbum], (err: any, rows: Photo[] | undefined) => {
          db.close((err) => {
            if (err) console.error('Erro ao fechar o banco de dados:', err);
          });

          if (err) {
            return reject(err);
          }
          resolve(rows);
        });
      });
    } catch (error: any) {
      throw new ApiAccessError(error.message, 400);
    }
  }

  async deletePhotoFromAlbum(idAlbum: number, url: string): Promise<void> {
    let db: Database;

    try {
      db = await openSqLiteConnection();

      return new Promise((resolve, reject) => {
        const query =
          'UPDATE Photo SET deleted_at = ? WHERE id_album = ? AND url = ?';

        db.run(query, [new Date().toISOString(), idAlbum, url], (err: any) => {
          db.close((err) => {
            if (err) console.error('Erro ao fechar o banco de dados:', err);
          });

          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    } catch (error: any) {
      throw new ApiAccessError(error.message, 400);
    }
  }
}

export default PhotoService;
