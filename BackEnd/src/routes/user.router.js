import express from 'express'
import { commentPicture, getCreatedPicture, getSavedPicture, getUser, updateProfile } from '../controller/user.controller.js';
import { middleWareToken } from '../config/jwt.js';
import { uploadAvt } from '../config/upload.js';

const userRouter = express.Router();

userRouter.post("/comment/:pictureId", middleWareToken, commentPicture);
userRouter.get("/get-profile/:userId", middleWareToken, getUser);
userRouter.get("/saved-picture/:userId", middleWareToken, getSavedPicture);
userRouter.get("/created-picture/:userId", middleWareToken, getCreatedPicture);
userRouter.put("/update-profile/:id", middleWareToken, uploadAvt.single("avtImg"), updateProfile);

export default userRouter