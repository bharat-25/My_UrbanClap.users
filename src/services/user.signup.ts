import User from "../models/user.model"; // Import your Sequelize User model
import bcrypt from "bcrypt"
import "../config/env"
import { AcceptAny } from "../interfaces/global.interface";

export const registerUsers = async (userData:AcceptAny) => {
  try {
    const { username, email, password, phone_number, address } = userData;
    const salt=process.env.SALT;
    const encryptedPassword = await bcrypt.hash(password,5);

    // Create a new user record in the database
    const user = await User.create({
      username,
      phone_number,
      email,
      password: encryptedPassword,
      address
    });
    return user;
  } catch (err) {
    console.error('Error registering user:', err);
    return null; 
  }
};
