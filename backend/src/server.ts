import app from './app';
import db from './db';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 4000;

async function runMigrations() {
  const sql = fs.readFileSync(path.join(__dirname, 'db', 'migrations.sql'), 'utf8');
  await db.query(sql);
  console.log('Migrations applied');
}

runMigrations().then(() => {
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}).catch(err => { console.error(err); process.exit(1); });
