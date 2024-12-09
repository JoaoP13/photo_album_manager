import { Database } from 'sqlite3';
import { openSqLiteConnection } from '../index';
import { seedCompany } from './company-seed';
import SqLiteAccessError from '../../error/SqLiteAccessError';

async function seedAll() {
  let db: Database;

  try {
    db = await openSqLiteConnection();

    await seedCompany();
  } catch (error) {
    throw new SqLiteAccessError('Erro ao criar as tabelas!', 500);
  }
}

export { seedAll };
