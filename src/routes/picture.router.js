import express from 'express'
import { delPicture, getCommentPicture, getPicture, getPictureAndUsers, getSavedPictureStatus, searchPictureByName } from '../controller/picture.controller.js';

const pictureRouter = express.Router();

pictureRouter.get("/get-picture", getPicture);
pictureRouter.get("/search-picture", searchPictureByName);
pictureRouter.get("/get-picture-id/:pictureId", getPictureAndUsers);
pictureRouter.get("/get-commentPicture/:pictureId", getCommentPicture);
pictureRouter.get("/get-statusPicture/:pictureId", getSavedPictureStatus);
pictureRouter.delete("/delete-picture/:pictureId", delPicture);

export default pictureRouter