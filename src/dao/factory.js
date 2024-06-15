//mongo
import { MongoProductManager } from "./mongoManagers/mongoProductManager.js";
import { MongoUserManager } from "./mongoManagers/mongoUserManager.js";
import { MongoMessageManager } from "./mongoManagers/mongoMessageManager.js";
import { MongoCartManager } from "./mongoManagers/mongoCartManager.js";
//fs
import { CartManager } from "./filySystem/cartManager.js";
import { ProductManager } from "./filySystem/productManager.js";

import { config } from "../config/config.js";

export let Products;
export let User;
export let Message;
export let Carts;

switch (config.persistence) {
  case "MONGO":
    Products = MongoProductManager;
    User = MongoUserManager;
    Message = MongoMessageManager;
    Carts = MongoCartManager;
    break;
  case "FILE":
    Products = ProductManager;
    Carts = CartManager;
}
