import { Database } from 'sqlite3';
import { Address } from '../models/Address';
import { openSqLiteConnection } from '..';
import SqLiteAccessError from '../../error/SqLiteAccessError';
import { User } from '../models/User';

import('node-fetch');

async function fetchAddressData(): Promise<Address[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`Fecth error.`);
    }

    const data = await response.json();

    return data.length
      ? data.reduce((accum: Address[], curr: User, index: number) => {
          if (!accum.length) {
            accum = [
              {
                id: index + 1,
                street: curr.address.street,
                suite: curr.address.suite,
                city: curr.address.city,
                zipcode: curr.address.zipcode,
                lat: curr.address.geo.lat,
                lng: curr.address.geo.lng,
                created_at: new Date(),
                updated_at: new Date(),
              },
            ];

            return accum;
          }

          accum.push({
            id: index + 1,
            street: curr.address.street,
            suite: curr.address.suite,
            city: curr.address.city,
            zipcode: curr.address.zipcode,
            lat: curr.address.geo.lat,
            lng: curr.address.geo.lng,
            created_at: new Date(),
            updated_at: new Date(),
          });

          return accum;
        }, [])
      : [];
  } catch (error) {
    throw new SqLiteAccessError('Erro ao criar as tabelas!', 500);
  }
}

async function seedAddress(): Promise<void> {
  let db: Database;
  const query =
    'INSERT INTO Address (id, street, suite, city, zipcode, lat, lng, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  try {
    const addresses: Address[] = await fetchAddressData();
    db = await openSqLiteConnection();

    db.serialize(() => {
      const stmt = db.prepare(query);

      addresses.forEach((address) => {
        stmt.run(
          address.id,
          address.street,
          address.suite,
          address.city,
          address.zipcode,
          address.lat,
          address.lng,
          address.created_at.toISOString(),
          address.updated_at?.toISOString(),
          (err: any) => {
            if (err?.errno === 19 && err?.code === 'SQLITE_CONSTRAINT') {
              console.log(
                `Address ${address.street + ' ' + address.suite + ' ' + address.city + ' ' + address.zipcode} inserido com sucesso.`,
              );
            } else if (err) {
              console.error('Erro ao inserir registro:', err);
            } else {
              console.log(
                `Address ${address.street + ' ' + address.suite + ' ' + address.city + ' ' + address.zipcode} inserido com sucesso.`,
              );
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
    throw new SqLiteAccessError('Erro ao popular as Addresses!', 500);
  }
}

export { seedAddress };
