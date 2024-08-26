import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://huyngo285:Giahuy123@web82.de2cj.mongodb.net/?retryWrites=true&w=majority&appName=web82');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
