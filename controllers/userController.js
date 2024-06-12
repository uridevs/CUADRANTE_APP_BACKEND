const bcrypt = require('bcrypt');
const { User, Worker } = require('../db');

const updatePassword = async (req, res) => {
    const { userId } = req.user; // Assuming userId is stored in req.user after authentication
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'La contraseña actual es incorrecta.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({ error: 'Error al actualizar la contraseña.' });
    }
};

const assignWorkerToUser = async (req, res) => {
    const { userId, workerId } = req.body;

    try {
        const user = await User.findByPk(userId);
        const worker = await Worker.findByPk(workerId);

        if (!user || !worker) {
            return res.status(404).json({ error: 'Usuario o Trabajador no encontrado.' });
        }

        user.workerId = workerId;
        await user.save();

        res.status(200).json({ message: 'Trabajador asignado al usuario exitosamente.' });
    } catch (error) {
        console.error('Error al asignar trabajador:', error);
        res.status(500).json({ error: 'Error al asignar trabajador.' });
    }
};

module.exports = { updatePassword, assignWorkerToUser };
