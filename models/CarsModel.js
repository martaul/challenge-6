import { Sequelize } from "sequelize";
import moment from "moment";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

// Define the Users model
const Cars = db.define('cars', {
    name: {
        type: DataTypes.STRING,
        allowNull: false  // Adding a validation for demonstration
    },
    harga: {
        type: DataTypes.STRING,
        allowNull: false,  // Adding a validation for demonstration
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,  // Adding a validation for demonstration
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
}, {
    freezeTableName: true
});

Users.hasMany(Cars);
Cars.belongsTo(Users, {foreignKey: 'userId'});

export default Cars;
