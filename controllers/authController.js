const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../utils/mailer');
const { User } = require('../db');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../db');

const register = async (req, res) => {
    const { email, password } = req.body;
    const transaction = await sequelize.transaction();

    try {
        const token = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashedPassword, token }, { transaction });
        await sendVerificationEmail(email, token);

        await transaction.commit();

        res.status(200).json({ message: 'Registro exitoso, por favor verifica tu correo electrónico.' });
    } catch (error) {
        await transaction.rollback();
        console.error('Error en el registro:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        } else {
            res.status(500).json({ error: 'Error en el registro.', message: error});
        }
    }
};

const verify = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ where: { token } });

        if (user) {
            user.isVerified = true;
            user.token = null;
            await user.save();

            res.status(200).json({ message: 'Correo electrónico verificado con éxito.' });
        } else {
            res.status(400).json({ error: 'Token inválido o expirado.' });
        }
    } catch (error) {
        console.error('Error en la verificación:', error);
        res.status(500).json({ error: 'Error en la verificación.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta.' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ error: 'Por favor verifica tu correo electrónico.' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error en el login.' });
    }
};

module.exports = { register, verify, login };
