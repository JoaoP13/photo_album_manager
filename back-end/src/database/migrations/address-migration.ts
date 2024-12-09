import { Database } from 'sqlite3';
import { openSqLiteConnection } from '../index';
import SqLiteAccessError from '../../error/SqLiteAccessError';

async function createAddressTable() {
  let db: Database;

  try {
    db = await openSqLiteConnection();

    return new Promise<void>((resolve, reject) => {
      db.run(
        `          
          CREATE TABLE IF NOT EXISTS 'Address' (
            'id' int PRIMARY KEY,
            'street' varchar(60),
            'suite' varchar(30),
            'city' varchar(60),
            'zipcode' varchar(30),
            'lat' varchar(10),
            'lng' varchar(10),
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

export { createAddressTable };
