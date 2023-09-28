import bcrypt from "bcrypt";
import User from "../models/user.model"; 
import { OTP } from "../utils/sendOTP";
import {Token} from "../utils/createToken"

class login_users{
    login=async(email:string,password:string)=>{
        try{
            
            const userExists =await User.findOne({where: {email: email}});
            if(!userExists){
                throw new Error("User Not Found, Please Signup")
            }

            const pass = await bcrypt.compare(password, userExists.password);
            if (!pass) {
              throw new Error("Wrong Password");
            }

            if(!userExists.status==true){
                await OTP.verifyOTP(email);
                throw new Error("Not Verified!, Pls Verify your email,OTP already sent your mail ID");
            }

            const access_token= await Token.AccessToken(userExists.id)
            const refresh_token= await Token.RefreashToken(userExists.id)

            
        }
        catch{

        }
    }
}

export const loginUsers=new login_users()