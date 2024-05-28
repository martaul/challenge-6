import { Sequelize } from "sequelize";

const db = new Sequelize('challenge-6', 'root', '',{
    host:"localhost",
    dialect:"mysql"
});

export default db;