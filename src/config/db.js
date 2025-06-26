import mongoose from 'mongoose';
import config from '../config/_config.js';
import logger from '../utils/logger.js';
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri);
    logger.info(`Connect to db successfully ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error occur while trying to connect with db: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
