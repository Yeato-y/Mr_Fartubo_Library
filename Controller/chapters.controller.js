import LibraryDb from "../Model/connect.js";
import { chapters, insertChapter, selectChapters, selectChapById, updateChapterById, deleteChapterById } from "../Model/chapters.model.js";

const createChaptersTable = LibraryDb.run(chapters, (err) => {
    if (err) {
        console.error('Could not create table', err);
    } else {
        console.log('Table created or already exists');
    }
});


const createNewChapter = (req, res) => {
    const { bookid, title, content, order_number } = req.body;
    LibraryDb.run(insertChapter, [bookid, title, content, order_number], (err) => {
        if (err) {
            console.error('Could not insert chapter', err);
            res.status(500).send('Error creating chapter');
        } else {
            console.log('Chapter inserted successfully');
            res.send('Chapter created successfully');
        }
    })
}


const getAllChapters = (req, res) => {
    LibraryDb.all(selectChapters, [], (err, rows) => {
        if (err) {
            console.error('Could not fetch chapters', err);
            res.status(500).send('Error fetching chapters');
        } else {
            res.json(rows);
        }
    });
}

const getById = (req, res) => {
    const { chapid } = req.params;
    LibraryDb.get(selectChapById, [chapid], (err, row) => {
        if (err) {
            console.error('Could not fetch chapter', err);
            res.status(500).send('Error fetching chapter');
        } else {
            res.json(row);
        }
    });
}


const deleteById = (req, res) => {
    const { chapid } = req.params;
    LibraryDb.run(deleteChapterById, [chapid], function (err) {
        if (err) {
            console.error("error", err.message);
            res.status(500).send("error deleting chapter");
        } else {
            console.log(`a chapter has been deleted with rowid ${this.lastID}`);
            res.send(`Chapter deleted successfully`);
        }
    }
    )
}



const updateChapter = (req, res) => {
    const { chapid } = req.params;
    const { title, content, order_number } = req.body;

    if (
        title === undefined || content === undefined || order_number === undefined
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    LibraryDb.run(updateChapterById, [title, content, order_number, chapid], function (err) {
        if (err) {
            console.error('Could not update chapter', err);
            res.status(500).json({ error: 'Error updating chapter' });
        }
        else if (this.changes === 0) {
            res.status(404).json({ message: 'Chapter not found' });
        }
        else {
            res.status(200).json({ message: 'Chapter updated successfully' });
        }
    }
    );
};



export { createChaptersTable, createNewChapter, getAllChapters, getById, deleteById, updateChapter };