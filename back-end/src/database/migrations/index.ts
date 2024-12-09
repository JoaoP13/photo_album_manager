import { Database } from 'sqlite3';
import { openSqLiteConnection } from '../index';
import { createUserTable } from './user-migration';
import { createAddressTable } from './address-migration';
import { createCompanyTable } from './company-migration';
import { createAlbumTable } from './album-migration';
import { createPhotoTable } from './photo-migration';
import SqLiteAccessError from '../../error/SqLiteAccessError';

async function runMigrations() {
  let db: Database;

  try {
    db = await openSqLiteConnection();

    await createAddressTable();
    await createCompanyTable();
    await createUserTable();
    await createAlbumTable();
    await createPhotoTable();
  } catch (error) {
    throw new SqLiteAccessError('Erro ao criar as tabelas!', 500);
  }
}

export { runMigrations };
