import { Router } from "express";
import { MongoUserManager } from "../dao/mongoManagers/mongoUserManager.js";
import passport from "passport";
import {
  getCurrentUser,
  login,
  logout,
  recoverPassword,
  register,
  resetPassword,
} from "../controllers/session.controller.js";
import { UserDTO } from "../dao/dto/user.dto.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const sessionRouter = Router();
export const mongoUserManager = new MongoUserManager();

sessionRouter.post("/register", register);

sessionRouter.post("/login", login);

sessionRouter.get("/logout", logout);

sessionRouter.post("/recoverPassword", recoverPassword);

sessionRouter.post("/resetPassword", resetPassword);

sessionRouter.get("/user/current", authMiddleware, getCurrentUser);

sessionRouter.get("/user", (req, res) => {
  res.send(users);
});

//llamado interno para que empiece a actuar el passport y a comunicarse con github
sessionRouter.get(
  "/github",
  passport.authenticate("github", {}),
  (req, res) => {}
);

sessionRouter.get(
  "/callbackGithub",
  passport.authenticate("github", {}),
  (req, res) => {
    req.session.user = req.user;
    res.setHeader("Content-type", "application/json");
    // return res.status(200).json({ payload: req.user });
    return res.status(200).redirect("http://localhost:8080/views/profile");
  }
);

export default sessionRouter;
