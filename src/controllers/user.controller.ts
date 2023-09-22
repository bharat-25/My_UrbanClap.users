import { Request, Response } from "express";
import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../responses/service.responses";
import User from "../models/user.model"
import { registerUsers } from "../services/user.signup";

class UserController{
    signup= async(req:Request,res:Response)=>{
        try {
            let result = await this.isUserExist(req);
            if (!result) {
              const userData = req.body;
      
              const newUser = await registerUsers(userData);
      
              res.status(RESPONSE_CODES.CREATED).json({ message: RESPONSE_MESSAGES.CREATED, user: newUser });
            } else {
              res.status(RESPONSE_CODES.CONFLICT).json({ message: RESPONSE_MESSAGES.ALREADY_EXIST });
            }
        } catch (error) {
          res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    }
        isUserExist = async (req: Request) => {
        try {
          return await User.findOne({ where: {email: req.body.email,}});
        } catch {
          return console.error("error occured", Error);
        }
      };
} 

export const userController=new UserController()