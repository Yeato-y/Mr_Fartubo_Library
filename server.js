import Express from "express";
import { createUsersTable } from "./Controller/users.controller.js";
import { createBooksTable } from "./Controller/books.controller.js";
import { userRouter } from "./Routes/users.route.js";
import { bookRouter } from "./Routes/books.route.js";
import { chapterRouter } from "./Routes/chapters.route.js";
import { createChaptersTable } from "./Controller/chapters.controller.js";
import { createPurchaseTable } from "./Controller/purchase.controller.js";
import { purchaseRouter } from "./Routes/purchase.route.js";
import { createSubscriptionTable } from "./Controller/subscription.controller.js";
import { subRouter } from "./Routes/subscription.route.js";
//import dotenv from 'dotenv';
//dotenv.config();


const app = Express();
const port = process.env.Port || 6000;


app.use(Express.json());


createUsersTable;
app.use("/api/users", userRouter);


createBooksTable;
app.use('/api/books', bookRouter);



createChaptersTable;
app.use('/api/chapters', chapterRouter);

createPurchaseTable;
app.use('/api/purchases', purchaseRouter);

createSubscriptionTable;
app.use('/api/subscriptions', subRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});