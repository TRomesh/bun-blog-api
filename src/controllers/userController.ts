import { User } from '../models/user';
import { Request, Response} from 'express';

export const signUp = async (req: Request, res: Response) => {
  try {
      const { name, username, email, password } = req.body;
      const user = new User({ name, username, email, password });
      await user.save();
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
};

export const signIn = async (_: Request, res: Response) => {
  try {
      const posts = await User.find({}, { password:0 });
      res.status(200).send(posts);
    } catch (error) {
      res.status(500).send(error);
    }
};

export const readUsers = async (_: Request, res: Response) => {
    try {
        const posts = await User.find({}, { password:0 });
        res.status(200).send(posts);
      } catch (error) {
        res.status(500).send(error);
      }
};

export const readUser = async (req: Request, res: Response) => {
    try {
        const post = await User.findById(req.params.id);
        if (!post) {
          res.status(404).send();
        }
        res.status(200).send(post);
      } catch (error) {
        res.status(500).send(error);
      }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const post = await User.findByIdAndUpdate(req.params.id, req.body, {
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

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const post = await User.findByIdAndDelete(req.params.id);
        if (!post) {
          res.status(404).send("User wasn't found");
        }
        res.status(200).send(post);
      } catch (error) {
        res.status(500).send(error);
      }
};