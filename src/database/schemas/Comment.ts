import mongoose, { Schema } from 'mongoose';
import { IComment } from 'types/IComment';

const commentSchema = new mongoose.Schema<IComment>(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Comment = mongoose.model('Comment', commentSchema);
