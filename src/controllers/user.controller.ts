import { LOGIN_ERROR } from './../responses/service.responses';
import { OTP } from './../utils/sendOTP';
import { Request, Response } from "express";
import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../responses/service.responses";
import { registerUsers } from "../services/user.signup";
import { loginUsers } from '../services/user.login';
import { WelcomeMessages } from "../interfaces/enum";
import { loggers } from "../middlewares/logger/logger.middleware";
import { AcceptAny } from "../interfaces/global.interface";
import { error } from "console";

class UserController{
    home=async(req:Request,res:Response)=>{
      res.send(WelcomeMessages.WELLCOME_TO_USER_SERVICE)
    } 

    signup= async(req:Request,res:Response)=>{
        try {
            const { username, phone_number, email, password, address } = req.body;
            const newUser = await registerUsers.signupUser(username, phone_number,email, password, address);
            loggers.info("NEW USER SIGNUP")
            res.status(RESPONSE_CODES.CREATED).json({ message: RESPONSE_MESSAGES.CREATED, user: newUser });
        } catch (error) {
          res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    verify=async(req:Request,res:Response)=>{
      try{
        const {email,OTP}=req.body;
        const verify_user=await registerUsers.verify(email,OTP);
        res.status(RESPONSE_CODES.CREATED).json({ message: RESPONSE_MESSAGES.USER_VERIFY });
      }catch(error){
        res.status(RESPONSE_CODES.UNAUTHORIZED).json({ message: error.message });
      }
    }

    login=async(req:Request,res:Response)=>{
      try{
        const {email,password}=req.body;
        const user_login=await loginUsers.login(email,password);
        if(user_login=="Wrong Password"){
         return res.status(RESPONSE_CODES.NOTFOUND).json({Message:LOGIN_ERROR.NOT_MATCH})
        }
        res.status(RESPONSE_CODES.SUCCESS).json({Message:RESPONSE_MESSAGES.SUCCESS,result:user_login})
      }
      catch(error){
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({message:error})
      }
    }
} 

export const userController=new UserController()