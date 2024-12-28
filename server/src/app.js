import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/user", userRoutes);

app.get("/", (req, res) => res.send("AI Agent"));

export default app;