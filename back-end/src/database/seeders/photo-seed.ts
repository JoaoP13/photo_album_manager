import { Database } from 'sqlite3';
import { Company } from '../models/Company';
import { openSqLiteConnection } from '..';
import SqLiteAccessError from '../../error/SqLiteAccessError';
import { Photo } from '../models/Photo';

import('node-fetch');

async function fetchPhotoData(): Promise<Photo[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');

    if (!response.ok) {
      throw new Error(`Fecth error.`);
    }

    const data = await response.json();

    return data.length
      ? data.map((element: Photo) => {
          return {
            id: element.id,
            albumId: element.albumId,
            title: element.title,
            url: element.url,
            thumbnailUrl: element.thumbnailUrl,
            created_at: new Date(),
            updated_at: new Date(),
          };
        })
      : [];
  } catch (error) {
    throw new SqLiteAccessError('Erro ao criar as tabelas!', 500);
  }
}

async function seedPhoto(): Promise<void> {
  let db: Database;
  const query =
    'INSERT INTO Photo (id, id_album, title, url, thumbnail_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)';

  try {
    const photos: Photo[] = await fetchPhotoData();
    db = await openSqLiteConnection();

    db.serialize(() => {
      const stmt = db.prepare(query);

      photos.forEach((photo) => {
        stmt.run(
          photo.id,
          photo.albumId,
          photo.title,
          photo.url,
          photo.thumbnailUrl,
          photo.created_at.toISOString(),
          photo.updated_at?.toISOString(),
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

export { seedPhoto };
