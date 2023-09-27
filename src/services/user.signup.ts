import User from "../models/user.model"; // Import your Sequelize User model
import bcrypt from "bcrypt"
import "../config/env"
import { AcceptAny } from "../interfaces/global.interface";
import { OTP } from "../utils/sendOTP";
import { error } from "console";
import { loggers } from "../middlewares/logger/logger.middleware";
import { RedisClient } from "../databases/redis.connect";

class register_users{

  signupUser=async(username:string,phone_number:number,email:string,password:string,address:AcceptAny) =>{
    try {
      console.log('yes')
      const encryptedPassword = await bcrypt.hash(password,5);
      const userExists =await User.findOne({where: {email: email}});
  
      if(userExists && userExists.status == false){
        await OTP.verifyOTP(email)
        throw new Error("First Verify your mail!")
      }
      if(userExists){
        throw new Error("User Already exist!")
      }
        const user = await User.create({
          username,
          phone_number,
          email,
          password:encryptedPassword,
          address
        });
        console.log(user)
        await OTP.verifyOTP(email)
        return user
      }

  catch (e: any) {
  throw new Error(e.message);
  }
  }
  verify=async(email:string,otp:string)=>{
    try{
      const userExists =await User.findOne({where: {email: email}});
      if(!userExists){
        throw new Error("User not found!.. Please Signup ")
      }
      const get_otp=await RedisClient.getKey(email)
      if(!get_otp){
        throw new Error('OTP is expire');
      }
      if(otp!=get_otp){
        throw new Error ("Invalid OTP, Resend")
      }
      await User.update({status:true},{where:{email:email}})
    }catch(error){
      throw new Error(error.message)
    }
  }

}

  export const registerUsers=new register_users()