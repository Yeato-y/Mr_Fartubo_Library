import router from 'express';
import { createNewSubscription, getAllSubscriptions, updateSubscription } from '../Controller/subscription.controller.js';

const subRouter = router();

subRouter.route('/')
    .get(getAllSubscriptions)
    .post(createNewSubscription)

subRouter.route('/:subscriptionid')
    .put(updateSubscription);

export { subRouter };