module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("category", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'categories', // Make sure to match the table name exactly
        timestamps: false,
    })

    return Category

}