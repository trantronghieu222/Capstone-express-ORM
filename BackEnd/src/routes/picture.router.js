import express from 'express'
import { addPicture, delPicture, getCommentPicture, getPicture, getPictureAndUsers, getSavedPictureStatus, searchPictureByName } from '../controller/picture.controller.js';
import { middleWareToken } from '../config/jwt.js';
import { uploadPicture } from '../config/upload.js';

const pictureRouter = express.Router();

pictureRouter.get("/get-picture", getPicture);
pictureRouter.get("/search-picture", searchPictureByName);
pictureRouter.get("/get-picture-id/:pictureId", getPictureAndUsers);
pictureRouter.get("/get-commentPicture/:pictureId", getCommentPicture);
pictureRouter.get("/get-statusPicture/:pictureId", getSavedPictureStatus);
pictureRouter.delete("/delete-picture/:pictureId", middleWareToken, delPicture);
pictureRouter.post("/create-picture", middleWareToken, uploadPicture.single("fileImg"), addPicture)

export default pictureRouter