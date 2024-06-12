// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user', // 'admin' or 'user'
        },
        workerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'workers', // Nombre de la tabla Workers
                key: 'id'
            }
        }
    }, {
        timestamps: true,
        tableName: 'users'
    });

    return User;
};
