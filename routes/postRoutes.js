import express from 'express';
import { createPost, updatePost } from '../Controllers/PostController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);

export default router;
