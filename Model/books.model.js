const Books = `CREATE TABLE IF NOT EXISTS books (
    bookid INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    coverimage TEXT,
    price decimal(10, 2),
    is_free BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const insertBook = `INSERT INTO books (title, description, cover_image_url, price, is_free) VALUES (?, ?, ?, ?, ?)`;

const selectBooks = `SELECT * FROM books`;

const selectById = `SELECT * FROM Books WHERE bookid = ?`;

const deletebook = `DELETE FROM Books WHERE bookid= ?`;

const updateBookById = `UPDATE Books  SET title = ?, description = ?, coverimage = ?, price = ?, is_free = ? WHERE bookid = ?`;



export { Books, insertBook, selectBooks, selectById, deletebook, updateBookById };


