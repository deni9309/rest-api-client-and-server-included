const bcrypt = require('bcrypt');

const jwt = require('../lib/jwt');
const User = require('../models/User');
const { SECRET } = require('../config/constants');

exports.register = async (userData) => {
    const user = await User.create(userData);

    const result = await getAuthResult(user);

    return result;
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password!');
    }

    const result = await getAuthResult(user);

    return result;
};

async function getAuthResult(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

    const result = {
        _id: user._id,
        email: user.email,
        accessToken: token,
    };

    return result;
}
