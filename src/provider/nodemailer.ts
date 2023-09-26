import nodemailer from "nodemailer";
import "../config/env"
import { loggers } from "../middlewares/logger/logger.middleware";
import { RESPONSE_MESSAGES } from "../responses/service.responses";
import { AcceptAny } from "../interfaces/global.interface";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.My_Mail,
    pass: process.env.My_Password,
  },
  debug: true,
});
/**
 * @description customized messages send
 * @param to
 * @param subject
 * @param text
 */
export const sendEmail = async (to:string,subject:string ,text:string) => {
  try {
    console.log("===============",to , subject,text)
    await transporter.sendMail({
      from: process.env.My_Mail,
      to,
      subject,
      text,
    });
    loggers.info(RESPONSE_MESSAGES.EMAIL_SEND);
    return true
  } catch (error) {
    console.error(error)
    loggers.error("Error sending email:");
  }
};