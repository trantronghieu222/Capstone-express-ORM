import express from 'express'
import authRouter from './auth.router.js';
import pictureRouter from './picture.router.js';
import userRouter from './user.router.js';

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/picture', pictureRouter);
rootRouter.use('/user', userRouter);

export default rootRouter