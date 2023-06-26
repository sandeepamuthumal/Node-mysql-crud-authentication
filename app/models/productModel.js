module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        intro: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        category_id: {
            type: DataTypes.INTEGER
        },

    }, {
        tableName: 'products', // Make sure to match the table name exactly
        timestamps: false,
    })

    return Product

}