import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('A variável DATABASE_URL não está definida');
}

export default {
  client: 'postgresql',
  connection: databaseUrl,
};