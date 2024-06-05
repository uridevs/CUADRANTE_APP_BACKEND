// models/event.js
module.exports = (sequelize, DataTypes) => {
    const Day = require('./day')(sequelize, DataTypes);

    const Event = sequelize.define('Event', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.TEXT,
        },
        day_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Day,
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'events'
    });

    Event.belongsTo(Day, { foreignKey: 'day_id' });

    return Event;
};
