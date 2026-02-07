const subscription = `CREATE TABLE IF NOT EXISTS subscription (
    subscriptionid INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER,
    plan_name TEXT,
    start_date DATE,
    status TEXT,
    FOREIGN KEY (userid) REFERENCES users(userid)
    
)`;

const insertSubscription = `INSERT INTO subscription (userid, plan_name, start_date, status) VALUES (?, ?, ?, ?)`;

const selectSubscriptions = `SELECT * FROM subscription`;

export { subscription, insertSubscription, selectSubscriptions };