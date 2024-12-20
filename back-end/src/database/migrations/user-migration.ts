import { Database } from 'sqlite3';
import { openSqLiteConnection } from '../index';
import SqLiteAccessError from '../../error/SqLiteAccessError';

async function createUserTable() {
  let db: Database;

  try {
    db = await openSqLiteConnection();

    return new Promise<void>((resolve, reject) => {
      db.run(
        `
            CREATE TABLE IF NOT EXISTS 'User' (
            'id' int PRIMARY KEY,
            'name' varchar(60),
            'userName' varchar(30),
            'email' varchar(60),
            'id_address' integer,
            'phone' varchar(11),
            'website' varchar(60),
            'id_company' integer,
            'created_at' timestamp,
            'updated_at' timestamp,
            'deleted_at' timestamp,
            FOREIGN KEY (id_address) REFERENCES Address(id),
            FOREIGN KEY (id_company) REFERENCES Company(id)
          );`,
        (err) => {
          db.close((err) => {
            if (err) console.error('Erro ao fechar o banco de dados:', err);
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

export { createUserTable };
