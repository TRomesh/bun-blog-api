import express from 'express';
import { readUsers, readUser, updateUser, deleteUser } from '../controllers/userController';
const router = express.Router();

router.get('/user/', readUsers);
router.get('/user/:id', readUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;