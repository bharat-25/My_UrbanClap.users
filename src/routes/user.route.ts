import express from "express"
import { Router } from "express";
import { userController } from "../controllers/user.controller";
import {registerUserMiddleware} from "../middlewares/joivalidation/user-validation"
const userRoute = express.Router();

class UserRouter{
    private router!:Router;
    constructor(){
        this.router=Router();
    }

    userRouter(){
        this.router.get("/home",userController.home);
        this.router.post("/signup",registerUserMiddleware,userController.signup)
        return this.router;
    }
}

export const userRouter= new UserRouter();