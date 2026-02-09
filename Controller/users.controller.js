import LibraryDb from "../Model/connect.js";
import { Users, insertUser, selectUsers, selectById, updateUserById, deleteUserById } from "../Model/users.model.js";
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


const getById = (req, res) => {
    const { id } = req.params;
    LibraryDb.get(selectById, [id], (err, row) => {
        if (err) {
            console.error('Could not fetch user', err);
            res.status(500).send('Error fetching user');
        } else {
            res.json(row);
        }
    });
}


const deleteById = (req, res) => {
    const { id } = req.params;
    LibraryDb.run(deleteUserById, [id], function (err) {
        if (err) {
            console.error("error", err.message);
            res.status(500).send("error deleting user");
        } else {
            console.log(`a user has been deleted with rowid ${this.lastID}`);
            res.send(`User deleted successfully`);
        }
    }
    )
}



const updateUser = (req, res) => {
    const { userid } = req.params;
    const { fullName, email, password, role } = req.body;

    if (
        fullName === undefined || email === undefined || password === undefined || role === undefined
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    LibraryDb.run(updateUserById, [fullName, email, password, role, userid], function (err) {
        if (err) {
            console.error('Could not update user', err);
            res.status(500).json({ error: 'Error updating user' });
        }
        else if (this.changes === 0) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            res.status(200).json({ message: 'User updated successfully' });
        }
    }
    );
};


export { createUsersTable, createNewUser, getAllUsers, updateUser, getById, deleteById };