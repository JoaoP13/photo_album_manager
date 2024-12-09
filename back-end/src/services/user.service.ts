import { Database } from 'sqlite3';
import { openSqLiteConnection } from '../database';
import ApiAccessError from '../error/ApiAccessError';
import { User } from '../database/models/User';

type UserId = {
  id: number;
};

class UserService {
  constructor() {}

  async listIds(): Promise<UserId[] | undefined> {
    let db: Database;

    try {
      db = await openSqLiteConnection();

      return new Promise((resolve, reject) => {
        const query = 'SELECT id FROM User WHERE deleted_at IS NULL';

        db.all(query, [], (err: any, rows: UserId[] | undefined) => {
          db.close((err) => {
            err
              ? console.error('Erro ao fechar o banco de dados:', err)
              : console.log('Banco de dados fechado com sucesso.');
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

export default UserService;
