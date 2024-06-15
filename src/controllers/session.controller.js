import { MongoUserManager } from "../dao/mongoManagers/mongoUserManager.js";
import passport from "passport";
import { UserDTO } from "../dao/dto/user.dto.js";

export const mongoUserManager = new MongoUserManager();

export const register = async (req, res) => {
  try {
    const newUser = await mongoUserManager.register(req.body);
    req.session.user = newUser.toObject();
    res.redirect("http://localhost:8080/views/login");
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.log(error);
    res.status(500).json({ error: error.code, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await mongoUserManager.login(req.body);
    req.session.user = user;
    // req.session.user = user.toObject();
    res.redirect("http://localhost:8080/views/profile");
    return;
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.log(error);
    res.status(500).json({ error: error.code, message: error.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error en logout:", err);
      res.status(500).send("Error en logout");
    }
  });
  res.redirect("http://localhost:8080/views/login");
};

export const getCurrentUser = async (req, res) => {
  const userDTO = new UserDTO(req.session.user);
  res.render("current", { user: userDTO });
};
