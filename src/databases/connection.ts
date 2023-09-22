
import {Sequelize} from "sequelize";
import "../config/env"

const sequelize = new Sequelize(
    process.env.dbName, 
    process.env.userName, 
    process.env.password, 
    {
    host: process.env.host,
    dialect: 'postgres'  
})

 const dbconnection=async()=>{
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }catch(err){
        console.error("Unable to connect to the database:", err);
    }
}

export {sequelize, dbconnection };