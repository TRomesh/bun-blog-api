import { Post } from '../models/post';
import { Request, Response} from 'express';
import { validationResult } from 'express-validator';

export const createPost = async (req: Request, res: Response) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
          res.status(400).json({ errors: validationErrors.array() });
        }
        let {author, title, content} = req.body;
        const post = new Post({author, title, content});
        await post.save();
        res.status(201).send(post);
      } catch (error) {
        res.status(400).send(error);
      }
};

export const readPosts = async (_: Request, res: Response) => {
    try {
        const posts = await Post.find({});
        res.status(200).send(posts);
      } catch (error) {
        res.status(500).send(error);
      }
};

export const readPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
          res.status(404).send();
        }
        res.status(200).send(post);
      } catch (error) {
        res.status(500).send(error);
      }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
      let {id} = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!post) {
          res.status(404).send();
        }
        res.status(200).send(post);
      } catch (error) {
        res.status(400).send(error);
      }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
      let {id} = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
          res.status(404).send("Post wasn't found");
        }
        res.status(200).send(post);
      } catch (error) {
        res.status(500).send(error);
      }
};