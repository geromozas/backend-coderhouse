import { Router } from "express";
import { MongoCartManager } from "../dao/mongoManagers/mongoCartManager.js";
import {
  addProductToCart,
  createCart,
  deleteAllProducts,
  deleteProduct,
  getCartProducts,
  purchaseCart,
  updateQuantity,
} from "../controllers/cart.controller.js";

const cartsRouter = Router();
export const mongoCartManager = new MongoCartManager();

cartsRouter.post("/", createCart);

cartsRouter.get("/:cid", getCartProducts);

cartsRouter.post("/:cid/product/:pid", addProductToCart);

//eliminacion por id
cartsRouter.delete("/:cid/product/:pid", deleteProduct);

//eliminacion de los productos del carrito
cartsRouter.delete("/:cid", deleteAllProducts);

//update quantity
cartsRouter.put("/:cid/product/:pid", updateQuantity);

cartsRouter.post("/:cid/purchase", purchaseCart);

export { cartsRouter };
