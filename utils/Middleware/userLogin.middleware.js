
// import LibraryDb from "../Model/connect.js";
// //import { Users, insertUser, selectUsers, selectById, updateUserById, deleteUserById } from "../Model/users.model.js";
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// const login = (req, res) => {
//     const { email, password } = req.body;

//     LibraryDb.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {

//         if (err) {
//             console.error('Could not fetch user', err);
//             return res.status(500).json({ message: 'Error fetching user' });
//         }

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const valid = bcrypt.compareSync(password, user.password);

//         if (!valid) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         //  TOKEN CONTAINS USER ID + ROLE
//         const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'secret_key', { expiresIn: '1h' });
//         res.status(200).json({
//             message: 'Login successful',
//             token
//         });
//     });
// };


// export default login;