import { Router } from "express";
import { getMockProducts } from "../controllers/product.controller.js";

export const mockRouter = Router();

//productos mocks
mockRouter.get("/mockingproducts", getMockProducts);
