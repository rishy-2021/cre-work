import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db';
import taskRoutes from './src/routes/taskRoutes';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app: Application = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Expose-Headers", "Set-Cookie");
  next();
});


const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use('/api', taskRoutes);

app.get("/", (req, res) => {
  res.send("API Working. Version: 1.0");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
