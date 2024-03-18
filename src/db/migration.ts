import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from 'dotenv';
dotenv.config();

const postgres_user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;
const database = process.env.POSTGRES_DATABASE;

const migrationclient = postgres(`postgres://${postgres_user}:${password}@${host}:${port}/${database}`, { max: 1});

async function main() {
  try {
    await migrate(drizzle(migrationclient), {
      migrationsFolder: "src/db/migrations"
    });
    console.log("Migration Complete");
  } catch(e) {
    console.log("Could Not Migrate");
    console.log(e);
  }
}

main();
