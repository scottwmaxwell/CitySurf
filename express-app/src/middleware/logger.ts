import winston from "winston";
import { Loggly } from "winston-loggly-bulk";
import dotenv from "dotenv";
dotenv.config();

// Get environment variables
const logglyToken = process.env.LOGGLY ?? "default_token";
const subdomain = process.env.LOGGLY ?? "default_domain";

// Loggly configuration
const loggly = {
    "token": logglyToken,
    "subdomain": subdomain,
    "tags":["Winston-NodeJS"]
}

// Create logger
export const logger = winston.createLogger({
    level: 'info',
    transports: [
        new Loggly(loggly),
        new winston.transports.Console()
    ]
});

// Stream for logger used with Morgan in app.ts
export const stream = {
  write: (message: string) => {
    // Passing the message as a structured object for Winston
    logger.info({ message: message.trim() });
  },
};