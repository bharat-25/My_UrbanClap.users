import {Sequelize} from "sequelize";
import "../config/env"

class Database{
    private sequelize: any;

    constructor(){
    this.sequelize = new Sequelize(
        process.env.dbName, 
        process.env.userName, 
        process.env.password, 
        {
        host: process.env.host,
        dialect: 'postgres',
        logging: false
    })
}
getSequelize(){
    console.log("Connection has been established successfully.");
    return this.sequelize;
}
} 
const Dbase=new Database();
export const sequelize=Dbase.getSequelize();

//  const dbconnection=async()=>{
//     try{
//         await sequelize.authenticate();
//         console.log("Connection has been established successfully.");
//     }catch(err){
//         console.error("Unable to connect to the database:", err);
//     }
// }

// export {sequelize, dbconnection };