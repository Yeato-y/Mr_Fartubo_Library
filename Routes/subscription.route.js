import router from 'express';
import { createNewSubscription, getAllSubscriptions } from '../Controller/subscription.controller.js';

const subRouter = router();

subRouter.route('/')
    .get(getAllSubscriptions)
    .post(createNewSubscription)
export { subRouter };