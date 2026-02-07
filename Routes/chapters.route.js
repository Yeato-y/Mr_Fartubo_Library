import router from 'express';
import { createNewChapter, getAllChapters } from '../Controller/chapters.controller.js';

const chapterRouter = router();

chapterRouter.route('/')
    .get(getAllChapters)
    .post(createNewChapter)

export { chapterRouter };