import router from 'express';
import { createNewUser, getAllUsers, updateUser, deleteById, getById } from '../Controller/users.controller.js';

const userRouter = router();

userRouter.route('/')
    .get(getAllUsers)
    .post(createNewUser)

userRouter.route('/:id')
    .put(updateUser)
    .delete(deleteById)
    .get(getById)
//.patch(updateUser)


export { userRouter };