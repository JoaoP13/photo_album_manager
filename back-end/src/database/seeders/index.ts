import { Database } from 'sqlite3';
import { openSqLiteConnection } from '../index';
import SqLiteAccessError from '../../error/SqLiteAccessError';
import { seedUser } from './user-seed';
import { seedPhoto } from './photo-seed';
import { seedAlbum } from './album-seed';

async function seedAll() {
  let db: Database;

  try {
    db = await openSqLiteConnection();

    await seedUser();
    await seedPhoto();
    await seedAlbum();
  } catch (error) {
    throw new SqLiteAccessError('Erro ao criar as tabelas!', 500);
  }
}

export { seedAll };
