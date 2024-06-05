// models/worker.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Worker', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'workers'
    });
};
