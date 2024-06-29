import jwt from "jsonwebtoken";
import { UserModel } from "../dao/models/user.model.js";

export const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("http://localhost:8080/views/login");
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.session.user.role === "admin") {
    next();
  } else {
    res.json({ message: "Unauthorized" });
  }
};

export const userLogged = (req, res, next) => {
  if (req.session.user.role === "admin") {
    next();
  } else {
    res.json({ message: "Unauthorized" });
  }
};

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "secretKey");
    const user = await UserModel.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Autenticación fallida" });
  }
};
