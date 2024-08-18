import express from "express";
import cors from "cors";
import taskRoutes from "./src/routes/taskRoutes";
import dotenv from 'dotenv';
import connectDB from "./src/config/db";

require("dotenv").config();
dotenv.config();
connectDB();

const allowedOrigins = ['http://localhost:3000' , 'https://twello-clone-frontend.vercel.app'];
const app = express();


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

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use(express.json());

app.listen(5000);

module.exports = app;

app.use('/api', taskRoutes);

app.get("/", (req, res) => {
  res.send("API Working. Version: 1.0");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
