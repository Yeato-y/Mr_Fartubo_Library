import jwt from 'jsonwebtoken';


const authToken = (req, res, next) => {
    // 1 Read Authorization header
    const authHeader = req.headers.authorization;

    // 2 Check if header exists
    if (!authHeader) {
        return res.status(401).json({ message: 'Token required' });
    }

    // 3️ Extract token from "Bearer TOKEN"
    const token = authHeader.split(' ')[1];

    // 4️ Verify token
    try {
        const decoded = jwt.verify(token, 'secret_key'); // Use the same secret key used for signing

        // 5️ Attach user info to request
        req.user = decoded;

        // 6️ Allow request to continue
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};




const requireAdmin = (req, res, next) => {
    // 1️⃣ Check user role from token
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Sorry, you are not authorized to access this resource. Admin only.' });
    }

    // 2️⃣ User is admin → continue
    next();
};

export { authToken, requireAdmin };



