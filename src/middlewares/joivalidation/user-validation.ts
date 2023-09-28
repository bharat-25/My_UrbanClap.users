import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

const registerValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  address: Joi.array().items(
    Joi.object({
      addressType: Joi.string().valid("home", "work", "other").required(),
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      postalCode: Joi.string(),
    })
  ),
});

const verifyValidation= Joi.object({
  email: Joi.string().email().required(),
  OTP: Joi.string().min(4).max(4).required(),
});

const loginValidation= Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const validatedata = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      req.body = value;
      next();
    };
  };

export const registerUserMiddleware = validatedata(registerValidation);
export const verifyUserMiddleware = validatedata(verifyValidation);
export const loginUserMiddleware = validatedata(loginValidation);

