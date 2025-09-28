import { envNumber, env } from '@libs/env-unit';
import { registerAs } from '@nestjs/config';

export default registerAs('mssql', () => ({
  host: env('DB_HOST', ''),
  port: envNumber('DB_PORT', 1433),
  database: env('DB_NAME', 'testdb'),
  username: env('DB_USERNAME', ''),
  password: env('DB_PASSWORD', ''),
}));
