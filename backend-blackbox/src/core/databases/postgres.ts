import { Pool } from "pg";
import { env } from "../config/env";

export const pool = new Pool({
  host: env.postgres_host,
  port: env.postgres_port,
  user: env.postgres_user,
  password: env.postgres_password,
  database: env.postgres_database,
});
