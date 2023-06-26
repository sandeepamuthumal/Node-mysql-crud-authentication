module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'users', // Make sure to match the table name exactly
        timestamps: false,
    })

    return User

}