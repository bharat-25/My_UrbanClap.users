import express from "express"
import "./config/env"
import { dbconnection, sequelize } from "./databases/connection";
import userRoute from "./routes/user.route";

const app=express();
const PORT=process.env.PORT;

app.use(express.json());
dbconnection();
sequelize;
app.use('/user',userRoute);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})