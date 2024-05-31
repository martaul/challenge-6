import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

// Define the Users model
const Cars = db.define('cars', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }  // Adding a validation for demonstration
    },
    harga: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate:{
            notEmpty: true
        } // Adding a validation for demonstration
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }  // Adding a validation for demonstration
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    createdBy: {
        type: DataTypes.STRING,  // Assumes User ID is an integer
        allowNull: false,
    },
    updatedBy: {
        type: DataTypes.STRING,  // Assumes User ID is an integer
        allowNull: false,
    },
    deletedBy: {
        type: DataTypes.STRING,  // Assumes User ID is an integer
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: true,  // Menambahkan `createdAt` dan `updatedAt`
});

Users.hasMany(Cars);
Cars.belongsTo(Users, {foreignKey: 'userId'});

export default Cars;
