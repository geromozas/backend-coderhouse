import { Router } from "express";
import { mongoProductManager } from "../index.js";
import { io } from "../index.js";
import { MongoMessageManager } from "../dao/mongoManagers/mongoMessageManager.js";
import { mongoCartManager } from "./carts.routes.js";
import { authMiddleware, userLogged } from "../middleware/auth.middleware.js";
import {
  createMessage,
  login,
  profile,
  recoverPassword,
  register,
  resetPassword,
  viewAllProducts,
  viewChat,
  viewProductsOfCart,
  viewRealTimeProducts,
} from "../controllers/views.controller.js";

export const viewsRouter = Router();
const mongoMessageManager = new MongoMessageManager();

// TODOS LOS PRODUCTOS
viewsRouter.get("/products", authMiddleware, viewAllProducts);

//PRODUCTOS EN TIEMPO REAL
viewsRouter.get("/realTimeProducts", viewRealTimeProducts);

//PRODUCTOS DE CARRITO
viewsRouter.get("/cart/:id", viewProductsOfCart);

//CHAT
viewsRouter.get("/chat", viewChat);

viewsRouter.post("/chat", createMessage);

//sessions
viewsRouter.get("/register", register);

viewsRouter.get("/login", login);

viewsRouter.get("/profile", profile);

viewsRouter.get("/recoverPassword", recoverPassword);

viewsRouter.get("/resetPassword", resetPassword);
