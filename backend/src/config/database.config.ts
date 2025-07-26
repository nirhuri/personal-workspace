import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
    uri: process.env.MONGODB_URI,
    options: {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        bufferCommands: false,
    },
}));