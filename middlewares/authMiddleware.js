const jwt = require('jsonwebtoken');
const { User } = require('../db');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            throw new Error();
        }

        req.user = { userId: user.id, role: user.role };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Autenticación fallida.' });
    }
};

module.exports = { authenticate };
