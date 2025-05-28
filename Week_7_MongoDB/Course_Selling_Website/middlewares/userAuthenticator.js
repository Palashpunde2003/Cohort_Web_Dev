require('dotenv').config();
const jwt = require('jsonwebtoken');
JWT_SECRET_USER = process.env.JWT_SECRET_USER;

function userAuth(req, res, next){
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ 
            message: "No token provided or bad format" 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET_USER);
        req.userId = decoded.userId;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = {
    userAuth,
    JWT_SECRET_USER
};