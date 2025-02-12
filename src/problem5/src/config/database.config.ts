import path from 'path';
import { env } from './env.config';
import { DataSource } from 'typeorm';

const dbConfig = {
    type: env.DATABASE.CONNECT,
    host: env.DATABASE.HOST,
    port: env.DATABASE.PORT,
    username: env.DATABASE.USER,
    password: env.DATABASE.PASSWORD,
    database: env.DATABASE.NAME,
    entities: [path.join(__dirname, '../entities/*.entity.ts')],
    synchronize: true,
    keepConnectionAlive: true,
    autoLoadEntities: true,
    logging: false,
    ssl: {
        rejectUnauthorized: true,
        ca: env.DATABASE.DATABASE_CA_PEM
    }
};

export const AppDataSource = new DataSource(dbConfig);

export async function connectDB() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}
