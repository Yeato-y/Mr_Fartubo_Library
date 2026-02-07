import router from 'express';
import { createNewPurchase, getAllPurchases } from '../Controller/purchase.controller.js';

const purchaseRouter = router();

purchaseRouter.route('/')
    .get(getAllPurchases)
    .post(createNewPurchase)

export { purchaseRouter };