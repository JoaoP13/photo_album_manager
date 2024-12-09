import { Database } from 'sqlite3';
import { openSqLiteConnection } from '../index';
import SqLiteAccessError from '../../error/SqLiteAccessError';

async function createAlbumTable() {
  let db: Database;

  try {
    db = await openSqLiteConnection();

    return new Promise<void>((resolve, reject) => {
      db.run(
        `
          CREATE TABLE IF NOT EXISTS 'Album' (
            'id' int PRIMARY KEY,
            'id_user' int,
            'title' varchar(100),
            'created_at' timestamp,
            'updated_at' timestamp,
            'deleted_at' timestamp
          );`,
        (err) => {
          db.close((err) => {
            err
              ? console.error('Erro ao fechar o banco de dados:', err)
              : console.log('Banco de dados fechado com sucesso.');
          });

          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  } catch (error) {
    throw new SqLiteAccessError('Erro ao criar as tabelas!', 500);
  }
}

export { createAlbumTable };
