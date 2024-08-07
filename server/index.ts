import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db';
import taskRoutes from './src/routes/taskRoutes';
import dotenv from 'dotenv';
import allowCors from './src/utils/allowCors';

dotenv.config();
connectDB();

const app: Application = express();

// Configure CORS
app.use(cors({
    origin: '*', // Specify the origin or use '*' for open access
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    maxAge: 3600 // Define how long the results of a preflight request can be cached
}));

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use((req, res, next) => {
  console.log('Received request:', req.method, req.path);
  next();
});

app.use('/api', taskRoutes);

app.get("/", (req, res) => {
  res.send("API Working. Version: 1.0");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
