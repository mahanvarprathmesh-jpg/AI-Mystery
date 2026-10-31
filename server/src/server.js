import app from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

try {
  await connectDatabase(env.mongoUri);
  app.listen(env.port, () => console.info(`API listening on http://localhost:${env.port}`));
} catch (error) {
  console.error('Could not connect to MongoDB:', error.message);
  process.exit(1);
}
