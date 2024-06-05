const { Op } = require('sequelize');
const { sequelize, Day, Worker } = require('../db');

exports.getMonthSchedule = async (req, res) => {
    const { year, month } = req.params;
    try {
        const days = await Day.findAll({
            where: {
                date: {
                    [Op.between]: [
                        new Date(year, month - 1, 1),
                        new Date(year, month, 0)
                    ]
                }
            },
            include: Worker
        });
        res.status(200).json(days);
    } catch (error) {
        console.error('Error al obtener el cuadrante mensual:', error);
        res.status(500).json({ error: error.message });
    }
};

