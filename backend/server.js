import express from 'express';

import authRoutes from './routes/auth.route.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';


const app = express();

const PORT = ENV_VARS.PORT;

//console.log('Mongo URI:', ENV_VARS.MONGO_URI); // Check if the URI is logged correctly

app.use(express.json()); // will allow us to parse req. body in JSON format
app.use("/api/v1/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    connectDB();
});
