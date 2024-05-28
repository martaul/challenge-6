import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

// Define the Users model
const Users = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false  // Adding a validation for demonstration
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,  // Adding a validation for demonstration
        unique: true  // Ensure email is unique
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,  // Adding a validation for demonstration
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false  // Adding a validation for demonstration
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
}, {
    freezeTableName: true
});

// Sync the database
(async () => {
    try {
        await db.sync();
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();

export default Users;
