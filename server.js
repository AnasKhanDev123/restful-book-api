import { createServer } from 'http';
import app from './src/app.js';
import _config from './src/config/_config.js';
import logger from './src/utils/logger.js';
import connectDB from './src/config/db.js';

const server = createServer(app);

const startServer = () => {
  connectDB();
  server
    .listen(_config.port, () => {
      logger.info(`Server is running on port ${_config.port}`);
    })
    .on('error', (err) => {
      logger.error(`Error occur while starts server: ${err.message}`);
    });
};

startServer();
