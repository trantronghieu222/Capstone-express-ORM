import express from 'express'
import { commentPicture, getCreatedPicture, getSavedPicture, getUser } from '../controller/user.controller.js';
const userRouter = express.Router();

userRouter.post("/comment", commentPicture);
userRouter.get("/get-profile/:userId", getUser);
userRouter.get("/saved-picture/:userId", getSavedPicture);
userRouter.get("/created-picture/:userId", getCreatedPicture);

export default userRouter