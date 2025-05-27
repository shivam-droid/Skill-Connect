import dotenv from 'dotenv';
dotenv.config();

const serverConfig = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
  JWT_SECRET: process.env.JWT_SECRET}

export default serverConfig;