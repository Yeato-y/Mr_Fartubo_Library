import LibraryDb from "../Model/connect.js";
import { Purchase, insertPurchase, selectPurchases } from "../Model/purchase.model.js";

const createPurchaseTable = LibraryDb.run(Purchase, (err) => {
    if (err) {
        console.error('Could not create table', err);
    } else {
        console.log('Table created or already exists');
    }
});


const createNewPurchase = (req, res) => {
    const { userid, bookid, amount_paid, payment_reference } = req.body;
    LibraryDb.run(insertPurchase, [userid, bookid, amount_paid, payment_reference], (err) => {
        if (err) {
            console.error('Could not insert purchase', err);
            res.status(500).send('Error creating purchase');
        } else {
            console.log('Purchase inserted successfully');
            res.send('Purchase created successfully');
        }
    })
}


const getAllPurchases = (req, res) => {
    LibraryDb.all(selectPurchases, [], (err, rows) => {
        if (err) {
            console.error('Could not fetch purchases', err);
            res.status(500).send('Error fetching purchases');
        } else {
            res.json(rows);
        }
    });
}

export { createPurchaseTable, createNewPurchase, getAllPurchases };