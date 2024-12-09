import { Database } from 'sqlite3';
import { Company } from '../models/Company';
import { openSqLiteConnection } from '..';
import SqLiteAccessError from '../../error/SqLiteAccessError';
import { User } from '../models/User';

import('node-fetch');

async function fetchCompanyData(): Promise<Company[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`Fecth error.`);
    }

    const data = await response.json();

    return data.length
      ? data.reduce((accum: Company[], curr: User, index: number) => {
          if (!accum.length) {
            accum = [
              {
                id: index + 1,
                name: curr.company.name,
                catchPhrase: curr.company.catchPhrase,
                bs: curr.company.bs,
                created_at: new Date(),
                updated_at: new Date(),
              },
            ];

            return accum;
          }

          if (
            accum.length &&
            !accum.some(
              (element: Company) => element.name === curr.company.name,
            )
          ) {
            accum.push({
              id: index + 1,
              name: curr.company.name,
              catchPhrase: curr.company.catchPhrase,
              bs: curr.company.bs,
              created_at: new Date(),
              updated_at: new Date(),
            });

            return accum;
          }

          return accum;
        }, [])
      : [];
  } catch (error) {
    throw new SqLiteAccessError('Erro ao criar as tabelas!', 500);
  }
}

async function seedCompany(): Promise<void> {
  let db: Database;
  const query =
    'INSERT INTO Company (id, name, catchPhrase, bs, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)';

  try {
    const companys: Company[] = await fetchCompanyData();
    db = await openSqLiteConnection();

    db.serialize(() => {
      const stmt = db.prepare(query);

      companys.forEach((company) => {
        stmt.run(
          company.id,
          company.name,
          company.catchPhrase,
          company.bs,
          company.created_at.toISOString(),
          company.updated_at?.toISOString(),
          (err: any) => {
            if (err?.errno === 19 && err?.code === 'SQLITE_CONSTRAINT') {
              console.log(`Company ${company.name} já existe no banco.`);
            } else if (err) {
              console.error('Erro ao inserir registro:', err);
            } else {
              console.log(`Company ${company.name} inserido com sucesso.`);
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

export { seedCompany };
