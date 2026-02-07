import router from 'express';
import { createNewUser, getAllUsers } from '../Controller/users.controller.js';

const userRouter = router();

userRouter.route('/')
    .get(getAllUsers)
    .post(createNewUser)

export { userRouter };