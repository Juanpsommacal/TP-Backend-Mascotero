import dotenv from 'dotenv';
dotenv.config();

export const config = {
    mongoUri: process.env.MONGO_DB_CONNECTION_STRING,
};