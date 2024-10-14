
import  cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import webtoonRoutes from  './routes/webtoonRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();


app.use(cors());

app.use(express.json({limit:"16kb"}));

app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api', webtoonRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




