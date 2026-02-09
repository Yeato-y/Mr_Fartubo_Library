import LibraryDb from "../Model/connect.js";
import { subscription, insertSubscription, selectSubscriptions, updateSubscriptionById } from "../Model/subscription.model.js";

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

const updateSubscription = (req, res) => {
    const { subscriptionid } = req.params;
    const { userid, plan_name, start_date, status } = req.body;

    if (
        userid === undefined || plan_name === undefined || start_date === undefined || status === undefined
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    LibraryDb.run(updateSubscriptionById, [userid, plan_name, start_date, status, subscriptionid], function (err) {
        if (err) {
            console.error('Could not update subscription', err);
            res.status(500).json({ error: 'Error updating subscription' });
        }
        else if (this.changes === 0) {
            res.status(404).json({ message: 'Subscription not found' });
        }
        else {
            res.status(200).json({ message: 'Subscription updated successfully' });
        }
    }
    );
};




export { createSubscriptionTable, createNewSubscription, getAllSubscriptions, updateSubscription };