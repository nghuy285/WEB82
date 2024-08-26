import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
},{ timestamps: true });

export default mongoose.model('Post', postSchema);
