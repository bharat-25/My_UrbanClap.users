import express from "express"
import { userController } from "../controllers/user.controller";
import {registerUserMiddleware} from "../middlewares/joivalidation/user-validation"
const userRoute = express.Router();

userRoute.route('/').get();
userRoute.route('/signup').post(registerUserMiddleware,userController.signup);


export default userRoute;