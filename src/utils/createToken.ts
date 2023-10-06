import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

class generate_token{

    public  accessToken!:string
    public  refreshToken!:string


    /**
     * @description Create Access token  
     * @param userId 
     * @returns access token
     */

    AccessToken=async(userId:number)=>{
        const AccessTokenKey=process.env.Access_JWT_SECRET;
        const accessTokenId=uuidv4()
        const accessToken=jwt.sign({ userId }, AccessTokenKey, {
            expiresIn: process.env.ACCESS_TOKEN_TTL,
            jwtid: accessTokenId,
          });
          console.log("Access_Token : ",accessToken) 
          return {"AccessToken ":accessToken,"jwtID":accessTokenId}

    }

    /**
     * @description create refresh token 
     * @param userId 
     * @returns resfresh token 
     */
    RefreashToken=async(userId:number)=>{
        const RefreshTokenKey=process.env.Refresh_JWT_SECRET;
        const refreshTokenId=uuidv4()
        const refreshToken=jwt.sign({ userId }, RefreshTokenKey, {
            expiresIn: process.env.ACCESS_TOKEN_TTL,
            jwtid: refreshTokenId,
          });
          console.log("Refresh_Token : ",refreshToken) 
          return {"RefreshToken ":refreshToken,"jwtID":refreshTokenId}
    }
}
export const Token =new generate_token();