const { Op } = require('sequelize');
const { sequelize, Day, Worker } = require('../db');

exports.getMonthSchedule = async (req, res) => {
    const { year, month } = req.params;
    try {
        const days = await Day.findAll({
            where: {
                date: {
                    [Op.between]: [
                        new Date(year, month - 1, 1), // month - 1 because JavaScript Date object month is 0-based
                        new Date(year, month, 0) // This will get the last day of the previous month, so we need to add 1 month and set day to 0 to get the last day of the desired month
                    ]
                }
            },
            include: Worker
        });
        res.json(days);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
