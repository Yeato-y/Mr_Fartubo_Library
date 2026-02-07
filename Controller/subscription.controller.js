import LibraryDb from "../Model/connect.js";
import { subscription, insertSubscription, selectSubscriptions } from "../Model/subscription.model.js";

const createSubscriptionTable = LibraryDb.run(subscription, (err) => {
    if (err) {
        console.error('Could not create table', err);
    } else {
        console.log('Table created or already exists');
    }
});


const createNewSubscription = (req, res) => {
    const { userid, plan_name, start_date, status } = req.body;
    LibraryDb.run(insertSubscription, [userid, plan_name, start_date, status], (err) => {
        if (err) {
            console.error('Could not insert subscription', err);
            res.status(500).send('Error creating subscription');
        } else {
            console.log('Subscription inserted successfully');
            res.send('Subscription created successfully');
        }
    })
}


const getAllSubscriptions = (req, res) => {
    LibraryDb.all(selectSubscriptions, [], (err, rows) => {
        if (err) {
            console.error('Could not fetch subscriptions', err);
            res.status(500).send('Error fetching subscriptions');
        } else {
            res.json(rows);
        }
    });
}

export { createSubscriptionTable, createNewSubscription, getAllSubscriptions };