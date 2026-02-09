const Users = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const insertUser = `INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)`;

const selectUsers = `SELECT * FROM users`;

const selectById = `SELECT * FROM users WHERE id = ?`;

const deleteUserById = `DELETE FROM users WHERE id= ?`;

const updateUserById = `UPDATE users SET fullName = ?, email = ?, password = ?, role = ? WHERE id = ?`;


export { Users, insertUser, selectUsers, selectById, updateUserById, deleteUserById };