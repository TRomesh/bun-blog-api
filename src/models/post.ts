import { Schema, InferSchemaType, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: String,
    createdAt: { type: Date, default: Date.now },
  }
);

export type Post = InferSchemaType<typeof postSchema>;
export const Post = model('Post', postSchema);
