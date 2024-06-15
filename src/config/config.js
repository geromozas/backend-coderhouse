import "dotenv/config";

export const config = {
  dbConnection: process.env.DB_CONNECTION,
  dbPort: process.env.DB_PORT,
  dbClientId: process.env.DB_CLIENT_ID,
  dbClientSecret: process.env.DB_CLIENT_SECRET,
  persistence: process.env.PERSISTENCE,
};
