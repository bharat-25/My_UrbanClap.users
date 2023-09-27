import { loggers } from "../middlewares/logger/logger.middleware"
import { AcceptAny } from "../interfaces/global.interface";
import {sendEmail} from "../provider/nodemailer"
import { RedisClient } from "../databases/redis.connect";
import { EMAIL } from "../responses/service.responses";

class Otp{
    async verifyOTP(email:AcceptAny){
        const Email=email;
        let otp=Math.floor(1000 + Math.random() * 9000)
        loggers.info(`OTP is ${otp}`);
        const storeOTPInRedis= await RedisClient.setKey(`${Email}`,JSON.stringify(otp),{EX: 300 });
        console.log("-------------------------------------------------------redis store ------------------------------")
        let text_message=`${EMAIL.EMAIL_TEXT}${otp}`
        console.log(text_message)
        const res=await sendEmail(Email,EMAIL.EMAIL_SUBJECT,text_message)
        return true
    }
    catch(error:AcceptAny){
        throw new error(EMAIL.EMAIL_STATUS)
    }
}
export const OTP= new Otp()