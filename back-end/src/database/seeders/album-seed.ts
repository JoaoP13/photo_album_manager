import { Database } from 'sqlite3';
import UserService from '../../services/user.service';
import { openSqLiteConnection } from '..';
import SqLiteAccessError from '../../error/SqLiteAccessError';
import { Album } from '../models/Album';

import('node-fetch');

type UserId = {
  id: number;
};

async function fetchAlbumData(): Promise<Album[]> {
  const userServiceInstante: UserService = new UserService();

  try {
    let resultPromises: any = [];
    let usersIds: UserId[] | undefined = await userServiceInstante.listIds();

    resultPromises = usersIds?.map(async (element: UserId) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${element.id}/albums`,
      );

      if (!response.ok) {
        throw new Error(`Fecth error.`);
      }

      const data = await response.json();

      return data.length
        ? data.map((element: Album) => {
            return {
              id: element.id,
              userId: element.userId,
              title: element.title,
              created_at: new Date(),
              updated_at: new Date(),
            };
          })
        : [];
    });

    let result = await Promise.all(resultPromises);

    return result.length ? result.flat(Infinity) : [];
  } catch (error) {
    throw new SqLiteAccessError('Erro ao criar as tabelas!', 500);
  }
}

async function seedAlbum(): Promise<void> {
  let db: Database;
  const query =
    'INSERT INTO Album (id, id_user, title, created_at, updated_at) VALUES (?, ?, ?, ?, ?)';

  try {
    const albuns: Album[] = await fetchAlbumData();

    db = await openSqLiteConnection();

    db.serialize(() => {
      const stmt = db.prepare(query);

      albuns.forEach((album) => {
        stmt.run(
          album.id,
          album.userId,
          album.title,
          album.created_at.toISOString(),
          album.updated_at?.toISOString(),
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
      if (err) console.error('Erro ao fechar o banco de dados:', err);
    });
  } catch (error) {
    throw new SqLiteAccessError('Erro ao popular as Companys!', 500);
  }
}

export { seedAlbum };
