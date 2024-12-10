import { Database } from 'sqlite3';
import { openSqLiteConnection } from '../database';
import ApiAccessError from '../error/ApiAccessError';
import { Album } from '../database/models/Album';

class AlbumService {
  constructor() {}

  async list(): Promise<Album[] | undefined> {
    let db: Database;

    try {
      db = await openSqLiteConnection();

      return new Promise((resolve, reject) => {
        const query =
          'SELECT * FROM Album a INNER JOIN User u ON u.id = a.id_user WHERE a.deleted_at IS NULL AND u.deleted_at IS NULL';

        db.all(query, [], (err: any, rows: Album[] | undefined) => {
          db.close((err) => {
            if (err) console.error('Erro ao fechar o banco de dados:', err);
          });

          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve(rows);
        });
      });
    } catch (error: any) {
      throw new ApiAccessError(error.message, 400);
    }
  }

  async getById(id: any): Promise<Album[] | undefined> {
    let db: Database;

    try {
      db = await openSqLiteConnection();

      return new Promise((resolve, reject) => {
        const query =
          'SELECT * FROM Album a INNER JOIN User u ON u.id = a.id_user WHERE a.deleted_at IS NULL AND u.deleted_at IS NULL AND a.id_user = ?';

        db.all(query, [id], (err: any, rows: Album[] | undefined) => {
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
}

export default AlbumService;
