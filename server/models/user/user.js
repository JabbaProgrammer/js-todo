module.exports = (sequelize, dataTypes) => sequelize.define(
    'users', // table name
    {
        id: {type: dataTypes.UUIDV4, allowNull: false, primaryKey: true, autoIncrement: true},
        email: { type: dataTypes.STRING, allowNull: false },
        password: {type: dataTypes.STRING, allowNull: false }
    },
    {
        underscored: true
    }
);