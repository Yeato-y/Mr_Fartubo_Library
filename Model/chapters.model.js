const chapters = `CREATE TABLE IF NOT EXISTS chapters (
    chapid INTEGER PRIMARY KEY AUTOINCREMENT,
    bookid INTEGER,
    title TEXT,
    content TEXT,
    order_number text,
    FOREIGN KEY (bookid) REFERENCES books(bookid)
)`;

const insertChapter = `INSERT INTO chapters (bookid, title, content, order_number) VALUES (?, ?, ?, ?)`;

const selectChapters = `SELECT * FROM chapters`;

export { chapters, insertChapter, selectChapters };