import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db';
import taskRoutes from './src/routes/taskRoutes';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200 // For legacy browser support
};

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use('/api', taskRoutes);

app.get("/", (req, res) => {
  res.send("API Working. Version: 1.0");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
