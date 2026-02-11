import router from 'express';
import { createNewBook, getAllBooks, getById, deleteBookById, updateBook } from '../Controller/books.controller.js';
import { authToken, requireAdmin } from '../utils/Middleware/userPermit.middleware.js';
//import { authKey } from '../utils/Middleware/apiKey.middleware.js';


const bookRouter = router();
//bookRouter.use(authKey);

bookRouter.route('/')
    .get(getAllBooks)

bookRouter.post('/', authToken,
    requireAdmin,
    createNewBook)

bookRouter.delete('/:bookid',
    authToken,
    requireAdmin,
    deleteBookById)

bookRouter.get('/:bookid', getById)

bookRouter.put('/:bookid',
    authToken,
    requireAdmin,
    updateBook)
//.patch(updateBook)


export { bookRouter };