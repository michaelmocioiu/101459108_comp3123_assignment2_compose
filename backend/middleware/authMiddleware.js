const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token
    }

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        req.user = user; // Save user info to request
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateJWT;