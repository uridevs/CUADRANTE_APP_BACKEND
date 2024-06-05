const { sendVerificationEmail } = require('../utils/mailer');
const { User } = require('../db');
const { v4: uuidv4 } = require('uuid'); // Para generar tokens únicos
const { sequelize } = require('../db'); // Importa sequelize para las transacciones

const register = async (req, res) => {
    const { email } = req.body;
    const transaction = await sequelize.transaction();

    try {
        const token = uuidv4();

        const user = await User.create({
            email: email,
            token: token,
        }, { transaction });

        await sendVerificationEmail(email, token);

        await transaction.commit();

        res.status(200).send('Registro exitoso, por favor verifica tu correo electrónico.');
    } catch (error) {
        await transaction.rollback();
        console.error('Error en el registro:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send('El correo electrónico ya está registrado.');
        } else {
            res.status(500).send('Error en el registro.');
        }
    }
};

const verify = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ where: { token: token } });

        if (user) {
            user.isVerified = true;
            user.token = null;
            await user.save();

            res.status(200).send('Correo electrónico verificado con éxito.');
        } else {
            res.status(400).send('Token inválido o expirado.');
        }
    } catch (error) {
        console.error('Error en la verificación:', error);
        res.status(500).send('Error en la verificación.');
    }
};

module.exports = {
    register,
    verify,
};
