import express from 'express';
import { body } from 'express-validator';
const router = express.Router();

import { createPost, readPost, readPosts, updatePost, deletePost } from '../controllers/postController';

export const postValidator = [
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('author').notEmpty(),
];

router.post('/post',postValidator, createPost);
router.get('/posts', readPosts);
router.get('/post/:id', readPost);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

export default router;