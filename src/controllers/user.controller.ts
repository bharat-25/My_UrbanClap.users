import { Request, Response } from "express";
import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../responses/service.responses";
import User from "../models/user.model"
import { registerUsers } from "../services/user.signup";
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
} 

export const userController=new UserController()