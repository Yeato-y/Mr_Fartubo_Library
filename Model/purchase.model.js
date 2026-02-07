const Purchase = `CREATE TABLE IF NOT EXISTS purchase (
    purchaseid INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER,
    bookid INTEGER,
    amount_paid decimal(10, 2),
    payment_reference TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (bookid) REFERENCES books(bookid)
)`;

const insertPurchase = `INSERT INTO purchase (userid, bookid, amount_paid, payment_reference) VALUES (?, ?, ?, ?)`;

const selectPurchases = `SELECT * FROM purchase`;

export { Purchase, insertPurchase, selectPurchases };