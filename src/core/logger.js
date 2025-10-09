import winston from 'winston';
import { Transform } from 'stream';

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize(),
        winston.format.printf(
            (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
        )
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true })
            )
        })
    ]
});

const logToStdout = new Transform({
    transform(chunk, encoding, callback) {
        process.stdout.write(chunk);
        callback();
    }
});

logger.stream = {
    write: (message) => {
        logger.info(message.trim());
    }
};

export default logger;