import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  apiKey: { type: String },
});

export default mongoose.model('User', userSchema);
