import app from './app';
import { runMigrations } from './database/migrations/index';
import { seedAll } from './database/seeders';
import SqLiteAccessError from './error/SqLiteAccessError';

const port = process.env.PORT || 3008;

app.listen(port, async () => {
  try {
    await runMigrations();
    await seedAll();
  } catch (error) {
    throw new SqLiteAccessError('Erro desconhecido do servidor', 500);
  }

  console.log(`Server is listening on port ${port}`);
});
