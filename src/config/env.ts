import { loadEnvFile } from 'node:process';

loadEnvFile();

export const dbConfig = {
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'simulador',
    host: process.env.DATABASE_HOST || 'localhost',
};

export const serverConfig = {
    port: parseInt(process.env.PORT || '3000', 10),
};

export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};
