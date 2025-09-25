import express from 'express'
import bodyParser from "body-parser";
import session from 'express-session'
import cors from 'cors';
import logger from './src/core/logger.js';

const app = express()
const PORT = process.env.PORT || 3000;



// Conectar a la base de datos
// connectDB();


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret", // Usar variable de entorno
        resave: false,
        saveUninitialized: false,
    })
)

// Rutas
// app.use("/api/user", userRoute)
// app.use("/api", loginRoute)
// app.use('/api/email', emailRoute);
// app.use('/api/chat', chatRoute)
// app.use('/api/start', startRouter)


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
