const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers['authorization'];

    // If no token is provided, deny access
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded; // Attach the decoded user data to the request object
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        // If the token is invalid, deny access
        res.status(400).send('Invalid token.');
    }
};

module.exports = authenticate;