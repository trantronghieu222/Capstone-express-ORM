import multer, {diskStorage} from 'multer';

export const uploadPicture = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/imgs",
        filename: (req, file, callback) => {
            let newName = new Date().getTime() + "_" + file.originalname;
            callback(null, newName)
        }

    })
})

export const uploadAvt = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/imgs",
        filename: (req, file, callback) => {
            let newName = new Date().getTime() + "_avatar_" + file.originalname;
            callback(null, newName)
        }

    })
})