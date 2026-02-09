import router from 'express';
import { createNewChapter, getAllChapters, getById, deleteById, updateChapter } from '../Controller/chapters.controller.js';

const chapterRouter = router();

chapterRouter.route('/')
    .get(getAllChapters)
    .post(createNewChapter)

chapterRouter.route('/:chapid')
    .get(getById)
    .delete(deleteById)
    .put(updateChapter)

export { chapterRouter };