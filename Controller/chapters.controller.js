import LibraryDb from "../Model/connect.js";
import { chapters, insertChapter, selectChapters } from "../Model/chapters.model.js";

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

export { createChaptersTable, createNewChapter, getAllChapters };