import { Router } from "express";
import { mongoProductManager } from "../index.js";
import { io } from "../index.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/auth.middleware.js";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updateProduct,
} from "../controllers/product.controller.js";

const productsRouter = Router();

//ver todos los productos
productsRouter.get("/", getProducts);

//ver producto por id
productsRouter.get("/:pid", getProductsById);

//agregar producto
productsRouter.post("/", authMiddleware, addProduct);

//actualizar producto
productsRouter.put("/:pid", adminMiddleware, updateProduct);

//eliminar producto
productsRouter.delete("/:pid", authMiddleware, deleteProduct);

export { productsRouter };
