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

  async getByIdUser(id: any): Promise<Album[] | undefined> {
    let db: Database;

    try {
      db = await openSqLiteConnection();

      return new Promise((resolve, reject) => {
        const query =
          'SELECT a.id, a.id_user, title, name, email FROM Album a INNER JOIN User u ON u.id = a.id_user WHERE a.deleted_at IS NULL AND u.deleted_at IS NULL AND a.id_user = ?';

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

  async delete(id: any): Promise<void> {
    let db: Database;

    try {
      db = await openSqLiteConnection();

      return new Promise((resolve, reject) => {
        const query = 'UPDATE Album SET deleted_at = ? WHERE id = ?';

        db.run(query, [new Date().toISOString(), id], (err: any) => {
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

  async getMaxIdFromAlbum(): Promise<void> {
    let db: Database;

    try {
      db = await openSqLiteConnection();

      return new Promise((resolve, reject) => {
        const query = 'SELECT MAX(id) as id FROM Album';

        db.get(query, [], (err: any, row: any) => {
          db.close((err) => {
            if (err) console.error('Erro ao fechar o banco de dados:', err);
          });

          if (err) {
            return reject(err);
          }
          resolve(row);
        });
      });
    } catch (error: any) {
      throw new ApiAccessError(error.message, 400);
    }
  }

  async create(title: string, idUser: string): Promise<void> {
    let db: Database;

    try {
      db = await openSqLiteConnection();
      let maxId: any = await this.getMaxIdFromAlbum();
      console;

      return new Promise((resolve, reject) => {
        const query =
          'INSERT INTO Album (id, title, id_user, created_at, updated_at) VALUES (?, ?, ?, ?, ?)';

        db.run(
          query,
          [
            +maxId.id + 1,
            title,
            idUser,
            new Date().toISOString(),
            new Date().toISOString(),
          ],
          (err: any) => {
            db.close((err) => {
              if (err) console.error('Erro ao fechar o banco de dados:', err);
            });

            if (err) {
              return reject(err);
            }
            resolve();
          },
        );
      });
    } catch (error: any) {
      throw new ApiAccessError(error.message, 400);
    }
  }
}

export default AlbumService;
