const jwt = require('../lib/jwt');
const { SECRET } = require('../config/constants');

exports.auth = async (req, res, next) => {
    const token = req.header('X-Authorization');

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken;

            next();
        } catch (err) {
            res.status(401).json({
                message: 'You are not authorized!',
            });
        }
    } else {
        next();
    }
};