import mongoose from 'mongoose';
import { connectDB } from 'database/dbConn';
import { HOST, PORT } from 'constants/envVars';
import createApp from 'app/app';

const app = createApp();

connectDB();

const server = app.listen(PORT, HOST, () => {
  console.log(`[ ready ] http://${HOST}:${PORT}`);
});

server.on('error', console.error);
