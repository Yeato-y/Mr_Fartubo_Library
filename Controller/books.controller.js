import LibraryDb from "../Model/connect.js";
import { Books, deletebook, insertBook, selectBooks, selectById, updateBookById } from "../Model/books.model.js";

const createBooksTable = LibraryDb.run(Books, (err) => {
    if (err) {
        console.error('Could not create table', err);
    } else {
        console.log('Table created or already exists');
    }
});


const createNewBook = (req, res) => {
    const { title, description, coverimage, price, is_free } = req.body;
    LibraryDb.run(insertBook, [title, description, coverimage, price, is_free], (err) => {
        if (err) {
            console.error('Could not insert book', err);
            res.status(500).send('Error creating book');
        } else {
            console.log('Book inserted successfully');
            res.send('Book created successfully');
        }
    })
}


const getAllBooks = (req, res) => {
    LibraryDb.all(selectBooks, [], (err, rows) => {
        if (err) {
            console.error('Could not fetch books', err);
            res.status(500).send('Error fetching books');
        } else {
            res.json(rows);
        }
    });
}


const getById = (req, res) => {
    const { bookid } = req.params;
    LibraryDb.get(selectById, [bookid], (err, row) => {
        if (err) {
            console.error('Could not fetch book', err);
            res.status(500).send('Error fetching books');
        } else {
            res.json(row);
        }
    });
}


const deleteBookById = (req, res) => {
    const { bookid } = req.params;
    LibraryDb.run(deletebook, [bookid], function (err) {
        if (err) {
            console.error("error", err.message);
            res.status(500).send("error deletin book");
        } else {
            console.log(`a book has been deleted with rowid ${this.lastID}`);
            res.send(`Book deleted successfully`);
        }
    }
    )
}

const updateBook = (req, res) => {
    const { bookid } = req.params;
    const { title, description, cover_image_url, price, is_free } = req.body;

    if (
        !title || !description || !cover_image_url || !price || !is_free
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    LibraryDb.run(updateBookById, [title, description, cover_image_url, price, is_free, bookid], function (err) {
        if (err) {
            console.error('Could not update book', err.message);
            res.status(500).json({ error: 'Error updating book' });
        }
        else if (this.changes === 0) {
            res.status(404).json({ message: 'Book not found' });
        }
        else {
            res.status(200).json({ message: 'Book updated successfully' });
        }
    }
    );
};




export { createBooksTable, createNewBook, getAllBooks, getById, deleteBookById, updateBook };

// LibraryDb.all(`PRAGMA table_info(Books);`, (err, rows) => {
//     if (err) {
//         console.error('Error reading table info:', err);
//     } else {
//         console.log('Books table columns:', rows);
//     }
// });
