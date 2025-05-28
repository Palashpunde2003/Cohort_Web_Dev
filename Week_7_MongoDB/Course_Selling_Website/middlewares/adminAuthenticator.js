require('dotenv').config();
const jwt = require('jsonwebtoken');
JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

function adminAuth(req, res, next){
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "No token provided or invalid format"
        });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET_ADMIN);
        req.creatorId = decoded.id;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = {
    adminAuth,
    JWT_SECRET_ADMIN
};
