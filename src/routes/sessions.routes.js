import { Router } from "express";
import { MongoUserManager } from "../dao/mongoManagers/mongoUserManager.js";
import passport from "passport";
import {
  changeRole,
  deleteInactiveUsers,
  getAllUsers,
  getCurrentUser,
  login,
  logout,
  recoverPassword,
  register,
  resetPassword,
  uploadDocuments,
} from "../controllers/session.controller.js";
import { UserDTO } from "../dao/dto/user.dto.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import upload from "../config/multer.config.js";

const sessionRouter = Router();
export const mongoUserManager = new MongoUserManager();

sessionRouter.post("/register", register);

sessionRouter.post("/login", login);

sessionRouter.get("/logout", logout);

sessionRouter.post("/recoverPassword", recoverPassword);

sessionRouter.post("/resetPassword", resetPassword);

sessionRouter.get("/user/current", authMiddleware, getCurrentUser);

sessionRouter.put("/users/premium/:uid", changeRole);

sessionRouter.get("/", getAllUsers);

sessionRouter.delete("/inactive", deleteInactiveUsers);

sessionRouter.post(
  "/:uid/documents",
  upload.array("documents"),
  uploadDocuments
);

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
