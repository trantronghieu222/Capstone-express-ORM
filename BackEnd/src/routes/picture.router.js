import express from 'express'
import { addPicture, delPicture, getCommentPicture, getPicture, getPictureAndUsers, getSavedPictureStatus, searchPictureByName } from '../controller/picture.controller.js';
import multer, {diskStorage} from 'multer';

const pictureRouter = express.Router();

pictureRouter.get("/get-picture", getPicture);
pictureRouter.get("/search-picture", searchPictureByName);
pictureRouter.get("/get-picture-id/:pictureId", getPictureAndUsers);
pictureRouter.get("/get-commentPicture/:pictureId", getCommentPicture);
pictureRouter.get("/get-statusPicture/:pictureId", getSavedPictureStatus);
pictureRouter.delete("/delete-picture/:pictureId", delPicture);

// Upload
const upload = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/imgs",
        filename: (req, file, callback) => {
            let newName = new Date().getTime() + "_" + file.originalname;
            callback(null, newName)
        }

    })
})
// Add
pictureRouter.post("/create-picture", upload.single("fileImg"), addPicture)

export default pictureRouter