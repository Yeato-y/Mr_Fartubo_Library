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

const selectChapById = `SELECT * FROM chapters WHERE chapid = ?`;

const deleteChapterById = `DELETE FROM chapters WHERE chapid= ?`;

const updateChapterById = `UPDATE chapters SET title = ?, content = ?, order_number = ? WHERE chapid = ?`;


export { chapters, insertChapter, selectChapters, selectChapById, deleteChapterById, updateChapterById };