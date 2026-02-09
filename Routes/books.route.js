import router from 'express';
import { createNewBook, getAllBooks, getById, deleteBookById, updateBook } from '../Controller/books.controller.js';
//import { authKey } from '../utils/Middleware/apiKey.middleware.js';


const bookRouter = router();
//bookRouter.use(authKey);

bookRouter.route('/')
    .get(getAllBooks)
    .post(createNewBook)

bookRouter.route('/:bookid')
    .delete(deleteBookById)
    .get(getById)
    .put(updateBook)
//.patch(updateBook)


export { bookRouter };