import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export class PostgresService {
  static async query(sql) {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    const result = await client.query(sql);
    await client.end();
    return result.rows;
  }
}
