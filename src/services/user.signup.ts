import User from "../models/user.model"; // Import your Sequelize User model
import bcrypt from "bcrypt"
import "../config/env"
import { AcceptAny } from "../interfaces/global.interface";
import { OTP } from "../utils/sendOTP";
import { error } from "console";
import { loggers } from "../middlewares/logger/logger.middleware";

// export const registerUsers = async (userData:AcceptAny) => {
//   try {
//     const { username, email, password, phone_number, address } = userData;
//     const encryptedPassword = await bcrypt.hash(password,5);
    
//     const userExists =await User.findOne({ where: {email: userData.email}});
//     console.log("+++++++++++++++",userExists.email)
//     if(userExists && userData.email){
//       throw new error("User Already Exist. No need to Signup.. just login")
//     }

//     // Create a new user record in the database
//     const user = await User.create({
//       username,
//       phone_number,
//       email,
//       password: encryptedPassword,
//       address
//     });
//     const hii=await OTP.verifyOTP(email)
//     console.log(hii)
//     return user;
//   } catch (error) {
//     console.error('Error registering user:', error);
//     return null; 
//   }
// };

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
    //   if(userExists==null){
    //     const user = await User.create({
    //       username,
    //       phone_number,
    //       email,
    //       password:encryptedPassword,
    //       address
    //     });
    //     const send=await OTP.verifyOTP(email)
    //     if(send){
    //       loggers.info("Email Send Successfully")
    //       // return user
    //     }
    //     return user
    //   }
    // throw new Error("User Already exist!")

  catch (e: any) {
  throw new Error(e.message);
  }
  }}

  export const registerUsers=new register_users()