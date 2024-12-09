import { Database } from 'sqlite3';
import { openSqLiteConnection } from '../index';
import SqLiteAccessError from '../../error/SqLiteAccessError';

async function createCompanyTable() {
  let db: Database;

  try {
    db = await openSqLiteConnection();

    return new Promise<void>((resolve, reject) => {
      db.run(
        `
          CREATE TABLE IF NOT EXISTS 'Company' (
            'id' int PRIMARY KEY,
            'name' varchar(60) UNIQUE,
            'catchPhrase' varchar(256),
            'bs' varchar(80),
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
            console.log('Tabela criada ou já existente');
            resolve();
          }
        },
      );
    });
  } catch (error) {
    throw new SqLiteAccessError('Erro ao criar as tabelas!', 500);
  }
}

export { createCompanyTable };
