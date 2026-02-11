import LibraryDb from "../Model/connect.js";
import { Users, insertUser, selectUsers, selectById, updateUserById, deleteUserById } from "../Model/users.model.js";
import { encryptPassword } from "../utils/encryptpassword.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



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

// const loginUser = (req, res) => {
//     const { email, password } = req.body;
//     LibraryDb.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
//         if (err) {
//             console.error('Could not fetch user', err);
//             return res.status(500).send('Error fetching user');
//         }
//         if (!user) {
//             return res.status(401).send('Invalid email or password');
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).send('Invalid email or password');
//         }
//         const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, "secret_key", { expiresIn: '1h' });
//         res.json({ token });
//     });
// }

//Tryer of login function with jwt and bcrypt, but it is not working, so I will try to fix it later. For now, I will just return a message that the login is successful.


const login = (req, res) => {
    const { email, password } = req.body;

    LibraryDb.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {

        if (err) {
            console.error('Could not fetch user', err);
            return res.status(500).json({ message: 'Error fetching user' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const valid = bcrypt.compareSync(password, user.password);

        if (!valid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //  TOKEN CONTAINS USER ID + ROLE
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful',
            token
        });
    });
};



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



const updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullName, email, password, role } = req.body;
    const { password: hashedPassword } = await encryptPassword(password);

    if (
        fullName === undefined || email === undefined || password === undefined || role === undefined
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    LibraryDb.run(updateUserById, [fullName, email, hashedPassword, role, id], function (err) {
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


export { createUsersTable, createNewUser, getAllUsers, updateUser, getById, deleteById, login };