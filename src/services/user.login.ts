import bcrypt from "bcrypt";
import User from "../models/user.model"; 
import { OTP } from "../utils/sendOTP";
import {Generate_token} from "../utils/createToken"
import Token from "../models/token.model"
import Session from "../models/userSession.model";
import { LOGIN_ERROR } from "../responses/service.responses";
import { UUIDV4 } from "sequelize";
import { AcceptAny } from "../interfaces/global.interface";

class login_users{
    login=async(email:string,password:string)=>{
        try{
            
            const userExists =await User.findOne({where: {email: email} });
            if(!userExists){
                // throw new Error(LOGIN_ERROR.NOT_EXIST)
                return LOGIN_ERROR.NOT_EXIST
            }

            const pass = await bcrypt.compare(password, userExists.password);
            // console.log(pass)
            if (!pass) {
            //   throw Error(LOGIN_ERROR.NOT_MATCH);
              return LOGIN_ERROR.NOT_MATCH
            }

            if(!userExists.status==true){
                await OTP.verifyOTP(email);
                return LOGIN_ERROR.NOT_VERIFY
                // throw Error(LOGIN_ERROR.NOT_VERIFY);
            }
            const isSession= await Session.findOne({ where:{userId: userExists.id} });

            if(isSession){
                let checkstatus= isSession.is_active
                // const device=UUIDV4()
                const device="UUIDV4"

                if(checkstatus){
                    const access_token= await Generate_token.AccessToken(userExists.id,userExists.role)
                    const refresh_token= await Generate_token.RefreashToken(userExists.id,userExists.role)
                    const result=await Token.create({userId:userExists.id,accessToken:access_token.jwtID,refreshToken:refresh_token.jwtID,device})
                    const Access_Token=access_token.AccessToken
                    const Refresh_Token=refresh_token.RefreshToken
                    return {Access_Token,Refresh_Token};
                }

                const access_token= await Generate_token.AccessToken(userExists.id,userExists.role)
                const refresh_token= await Generate_token.RefreashToken(userExists.id,userExists.role)
                const result=await Token.create({userId:userExists.id,accessToken:access_token.jwtID,refreshToken:refresh_token.jwtID,device})
                const Access_Token=access_token.AccessToken
                const Refresh_Token=refresh_token.RefreshToken
                return {Access_Token,Refresh_Token};
            }
            const device="UUIDV4()"
            // const device:AcceptAny=UUIDV4()

            const access_token= await Generate_token.AccessToken(userExists.id,userExists.role)
            const refresh_token= await Generate_token.RefreashToken(userExists.id,userExists.role)
            console.log(access_token,refresh_token)
            console.log(userExists)

            const result = await Token.create({
                userId: userExists.id,
                accessToken: access_token.jwtID,
                refreshToken: refresh_token.jwtID,
                device:device,
              });

            await Session.create({
                userId: userExists.id,
                device:device,
                is_active:true
            });
            const Access_Token=access_token.AccessToken
            const Refresh_Token=refresh_token.RefreshToken
            return {Access_Token,Refresh_Token};
            
        }
        catch(error){
            console.log(error);
            throw Error(error.message)
        }
    }
}

export const loginUsers=new login_users()