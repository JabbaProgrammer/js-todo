module.exports = (sequelize, dataTypes) => sequelize.define(
    'tasks', 
    {
        id: {type: dataTypes.UUIDV4, primaryKey: true, allowNull: false, autoIncrement: true},
        name: {type: dataTypes.STRING, allowNull: false},
        description: {type: dataTypes.STRING, allowNull: false},
        complete: {type: dataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        user_id: {type: dataTypes.UUIDV4, allowNull: false}
    },
    {
        underscored: true
    }
);