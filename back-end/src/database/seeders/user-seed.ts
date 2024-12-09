import { Database } from 'sqlite3';
import { openSqLiteConnection } from '..';
import AddressService from '../../services/user.service';
import SqLiteAccessError from '../../error/SqLiteAccessError';
import { User } from '../models/User';

import('node-fetch');

async function fetchUserData(): Promise<User[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`Fecth error.`);
    }

    const data = await response.json();

    return data.length
      ? data.map((element: User) => {
          return {
            id: element.id,
            name: element.name,
            userdame: element.username,
            email: element.email,
            address: element.address,
            phone: element.phone,
            website: element.website,
            company: element.company,
            created_at: new Date(),
            updated_at: new Date(),
          };
        })
      : [];
  } catch (error) {
    throw new SqLiteAccessError('Erro ao criar as tabelas!', 500);
  }
}

async function seedUser(): Promise<void> {
  let db: Database;

  const query =
    'INSERT INTO User (id, name, userName, email, id_address, phone, website, id_company, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  try {
    const users: User[] = await fetchUserData();
    db = await openSqLiteConnection();

    db.serialize(() => {
      const stmt = db.prepare(query);

      users.forEach((user) => {
        stmt.run(
          user.id,
          user.name,
          user.username,
          user.email,
          user.address?.id,
          user.phone,
          user.website,
          user.company,
          user.created_at.toISOString(),
          user.updated_at?.toISOString(),
          (err: any) => {
            if (
              err &&
              !(err?.errno === 19 && err?.code === 'SQLITE_CONSTRAINT')
            ) {
              console.error('Erro ao inserir registro:', err);
            }
          },
        );
      });

      stmt.finalize((err) => {
        if (err) {
          console.error('Erro ao finalizar statement:', err);
        } else {
          console.log('Todos os registros foram inseridos.');
        }
      });
    });

    db.close((err) => {
      err
        ? console.error('Erro ao fechar o banco de dados:', err)
        : console.log('Banco de dados fechado com sucesso.');
    });
  } catch (error) {
    throw new SqLiteAccessError('Erro ao popular as Companys!', 500);
  }
}

export { seedUser };