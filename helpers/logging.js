require('dotenv').config();
const winston = require('winston');
const appRoot = require('app-root-path');

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

if (process.env.ENV_NAME !== 'test') {
  logger.add(new winston.transports.File({ filename: `${appRoot}/logs/error.log`, level: 'error' }));
  logger.add(new winston.transports.File({ filename: `${appRoot}/logs/app.log`, level: 'info' }));
}

logger.stream = {
  write(message) { logger.info(message); }
};

module.exports = logger;
