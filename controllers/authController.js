const { sendVerificationEmail } = require('../utils/mailer');
const { User } = require('../db');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../db');

const register = async (req, res) => {
    const { email } = req.body;
    const transaction = await sequelize.transaction();

    try {
        const token = uuidv4();

        const user = await User.create({ email, token }, { transaction });
        await sendVerificationEmail(email, token);

        await transaction.commit();

        res.status(200).json({ message: 'Registro exitoso, por favor verifica tu correo electrónico.' });
    } catch (error) {
        await transaction.rollback();
        console.error('Error en el registro:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        } else {
            res.status(500).json({ error: 'Error en el registro.' });
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

module.exports = { register, verify };
