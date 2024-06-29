import { UserModel } from "../models/user.model.js";
import { createHash, isValidatePassword } from "../../utils/bcrypt.js";
import { MongoCartManager } from "./mongoCartManager.js";
import {
  generateLoginError,
  generateRegistrationErrorENG,
  generatelEmailExistsError,
} from "../../services/errors/message/user-creation-error.message.js";
import EErrors from "../../services/errors/errors-enum.js";
import CustomError from "../../services/errors/CustomError.js";

const mongoCartManager = new MongoCartManager();

export class MongoUserManager {
  register = async (user) => {
    try {
      const { first_name, last_name, email, password, role = "user" } = user;
      if (!first_name || !last_name || !email || !password) {
        CustomError.createError({
          name: "User register Error",
          cause: generateRegistrationErrorENG({
            first_name,
            last_name,
            email,
            password,
          }),
          message: "Error trying to register the user",
          code: EErrors.INVALID_TYPES_ERROR,
        });
      }
      const existsEmail = await UserModel.findOne({ email });
      if (existsEmail) {
        CustomError.createError({
          name: "User register error",
          cause: generatelEmailExistsError({
            email,
          }),
          message: "Error trying to register the user",
          code: EErrors.ALREADY_EXISTS_ERROR,
        });
      }

      const hashedPassword = createHash(password);

      const newCart = await mongoCartManager.createCart();

      const newUser = UserModel.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role,
        cart: newCart._id,
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  login = async (user) => {
    try {
      const { email, password } = user;
      const existingUser = await UserModel.findOne({ email });

      if (!existingUser) {
        CustomError.createError({
          name: "User login error",
          cause: generateLoginError({
            email,
            password,
          }),
          message: "Error trying to login",
          code: EErrors.CREDENTIALS_ERROR,
        });
      }

      const isPasswordValid = isValidatePassword(existingUser, password);
      if (!isPasswordValid) {
        CustomError.createError({
          name: "User login error",
          cause: generateLoginError({
            email,
            password,
          }),
          message: "Error trying to login",
          code: EErrors.CREDENTIALS_ERROR,
        });
      }

      return existingUser;
    } catch (error) {
      throw error;
    }
  };

  findById = async (userId) => {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  findOne = async (query) => {
    try {
      const user = await UserModel.findOne(query);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  comparePassword = async (user, password) => {
    try {
      return isValidatePassword(user, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
