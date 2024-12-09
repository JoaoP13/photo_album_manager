import sqlite3, { Database } from 'sqlite3';

function openSqLiteConnection(): Promise<Database> {
  return new Promise((resolve, reject) => {
    try {
      const db = new sqlite3.Database('./photo_album.db', (err) => {
        err ? reject(err) : resolve(db);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export { openSqLiteConnection };
