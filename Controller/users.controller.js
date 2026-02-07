import LibraryDb from "../Model/connect.js";
import { Users, insertUser, selectUsers } from "../Model/users.model.js";
import { encryptPassword } from "../utils/encryptpassword.js";

const createUsersTable = LibraryDb.run(Users, (err) => {
    if (err) {
        console.error('Could not create table', err);
    } else {
        console.log('Table created or already exists');
    }
});


const createNewUser = async (req, res) => {
    const { fullName, email, password, role } = req.body;
    const { password: hashedPassword } = await encryptPassword(password);
    LibraryDb.run(insertUser, [fullName, email, hashedPassword, role], (err) => {
        if (err) {
            console.error('Could not insert user', err);
            res.status(500).send('Error creating user');
        } else {
            console.log('User inserted successfully');
            res.send('User created successfully');
        }
    })
}


const getAllUsers = (req, res) => {
    LibraryDb.all(selectUsers, [], (err, rows) => {
        if (err) {
            console.error('Could not fetch users', err);
            res.status(500).send('Error fetching users');
        } else {
            res.json(rows);
        }
    });
}

export { createUsersTable, createNewUser, getAllUsers };