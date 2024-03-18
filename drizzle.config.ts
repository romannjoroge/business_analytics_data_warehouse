import 'dotenv/config';
import type { Config } from 'drizzle-kit';

const postgres_user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;
const database = process.env.POSTGRES_DATABASE;

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: `postgres://${postgres_user}:${password}@${host}:${port}/${database}`,
  }
} satisfies Config;
