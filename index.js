import express from 'express';
import bodyParser from "body-parser";
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Importamos cookie-parser
import logger from './src/core/logger.js';
import { userRoute } from "./src/routers/userRouter.js";
import { connectDB } from './src/core/db.js';
import { loginRoute } from "./src/routers/loginRouter.js";
import { productosRoute } from "./src/routers/productosRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

app.use(cors({
    origin: 'http://localhost:5173', // Permitir explícitamente el origen del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Usamos el middleware cookie-parser
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false,
    })
);

// Rutas
app.use("/api/user", userRoute);
app.use("/api", loginRoute);
app.use("/api/productos", productosRoute);

const server = app.listen(PORT, () => {
    logger.info(`Servidor corriendo en el puerto ${PORT}`);
});

process.on('SIGTERM', () => {
    logger.info('');
    server.close(() => {
        logger.info('');
    });
});

export { app };