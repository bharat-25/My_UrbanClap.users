import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

class generate_token{
    public userId!: string;
    public  accessToken!:string
    public  refreshToken!:string


    /**
     * @description Create Access token  
     * @param userId 
     * @returns access token
     */

    AccessToken=async(userId:number,role:string)=>{
        const AccessTokenKey=process.env.Access_JWT_SECRET;
        const accessTokenId=uuidv4()
        const payload={userId,role,accessTokenId}
        const option=process.env.ACCESS_TOKEN_TTL;
        const accessToken=jwt.sign(payload, AccessTokenKey, {
            expiresIn: process.env.ACCESS_TOKEN_TTL,
          });
          console.log("Access_Token : ",accessToken) 
          return {AccessToken:accessToken,jwtID:accessTokenId}

    }

    /**
     * @description create refresh token 
     * @param userId 
     * @returns resfresh token 
     */
    RefreashToken=async(userId:number,role:string)=>{
        const RefreshTokenKey=process.env.Refresh_JWT_SECRET;
        const refreshTokenId=uuidv4();
        const payload={userId,role,refreshTokenId}
        const refreshToken=jwt.sign(payload, RefreshTokenKey, {
            expiresIn: process.env.REFRESH_TOKEN_TTL
          });
          console.log("Refresh_Token : ",refreshToken) 
          return {RefreshToken :refreshToken,jwtID:refreshTokenId}
    }
}

export const Generate_token =new generate_token();