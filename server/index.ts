import express, { Application } from 'express';
import cors from 'cors';
import connectDB from './src/config/db';
import taskRoutes from './src/routes/taskRoutes';
import dotenv from 'dotenv';

dotenv.config();
connectDB();
const allowedOrigins = ['http://localhost:3000' , 'https://cre-work-rnox.vercel.app'];

const app: Application = express();

// Configure CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
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
