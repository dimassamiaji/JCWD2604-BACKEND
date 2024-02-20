/** @format */

import Joi from "joi";
import { Response, Request, NextFunction } from "express";

const schema = Joi.object({
  email: Joi.string().required().email().message("email tidak sesuai"),
  password: Joi.string()
    .min(5)
    .max(16)
    // .pattern(/(?=(?:.*[a-z]){1,16}).+/, "lowercase")
    // .pattern(/(?=(?:.*[A-Z]){1,16}).+/, "uppercase")
    // .pattern(/(?=(?:.*[0-9]){1,16}).+/, "number")
    // .pattern(/(?=(?:.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]){1,16}).+/, "special")
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.base":
          case "string.empty":
          case "any.required":
          default:
            err.message = "error ";
            break;
          case "string.min":
            err.message = "kurang dari 5";
            break;
          case "string.max":
            err.message = "max dari 16";
            break;
          case "string.pattern.name":
            switch (err.local.name) {
              case "lowercase":
                err.message = "harus terdapat 1 lowercase";
                break;
              case "uppercase":
                err.message = "harus terdapat 1 uppercase ";
                break;
              case "number":
                err.message = "wajib ada number 1";
                break;
              case "special":
                err.message = "wajib terdapat special karakter";
                break;
            }
            break;
        }
      });

      return errors;
    }),
  first_name: Joi.string()
    .required()
    .lowercase()
    .min(5)
    .message("first_name minimal 5"),
  last_name: Joi.string().required(),
  gender: Joi.string(),
});

export const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, first_name, last_name, gender, repeat_password } =
      req.body;
    await schema.validateAsync({
      email,
      password,
      first_name,
      last_name,
      //   repeat_password,
      gender,
    });
    next();
  } catch (error) {
    next(error);
  }
};
