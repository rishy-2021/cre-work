import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db';
import taskRoutes from './src/routes/taskRoutes';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app: Application = express();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "https://www.cre-work-rnox.vercel.app", "https://cre-work-rnox.vercel.app"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use('/api', taskRoutes);

app.get("/", (req, res) => {
  res.send("API Working. Version: 1.0");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
