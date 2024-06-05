// models/day.js
module.exports = (sequelize, DataTypes) => {
    const Worker = require('./worker')(sequelize, DataTypes);
    
    const Day = sequelize.define('Day', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        worker_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Worker,
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'days'
    });

    Day.belongsTo(Worker, { foreignKey: 'worker_id' });

    return Day;
};
