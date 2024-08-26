import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT 
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(port, () => {
  console.log('Server is running on port 8080');
});
