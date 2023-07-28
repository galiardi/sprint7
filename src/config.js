import { config } from 'dotenv';

config();

export const { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

// export { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE };
