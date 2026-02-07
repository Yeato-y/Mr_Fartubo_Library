import router from 'express';
import { createNewBook, getAllBooks, getById, deleteBookById, updateBook } from '../Controller/books.controller.js';


const bookRouter = router();

bookRouter.route('/')
    .get(getAllBooks)
    .post(createNewBook)

bookRouter.route('/:bookid')
    .delete(deleteBookById)
    .get(getById)
    .put(updateBook)
//.patch(updateBook)


export { bookRouter };