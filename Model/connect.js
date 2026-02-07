import sqlite3 from 'sqlite3';

const SQL3 = sqlite3.verbose();

const LibraryDb = new SQL3.Database('./LibraryDb.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to LibraryDb SQLite database');
    }
});

export default LibraryDb;