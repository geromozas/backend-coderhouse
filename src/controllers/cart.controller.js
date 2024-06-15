import { Carts } from "../dao/factory.js";
import { productFactory } from "./product.controller.js";
import { createTicket } from "./ticket.controller.js";

export const cartDao = new Carts();

export const createCart = async (req, res) => {
  try {
    const response = await cartDao.createCart();
    res.json(response);
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    res.status(500).send(error.message);
  }
};

export const getCartProducts = async (req, res) => {
  const cart_id = req.params.cid;
  try {
    const response = await cartDao.getCartProducts(cart_id);
    res.json(response);
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    res.status(500).send(error.message);
  }
};

export const addProductToCart = async (req, res) => {
  const cart_id = req.params.cid;
  const product_id = req.params.pid;
  const { quantity } = req.body;
  try {
    const response = await cartDao.addProductToCart(
      cart_id,
      product_id,
      quantity
    );
    res.status(200).send("Producto agregado con éxito");
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  const cart_id = req.params.cid;
  const product_id = req.params.pid;

  try {
    const response = await cartDao.deleteProduct(cart_id, product_id);
    res.send(response);
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const deleteAllProducts = async (req, res) => {
  const cart_id = req.params.cid;
  try {
    const response = await cartDao.deleteAllProducts(cart_id);
    res.send(response);
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    res.status(500).send(error.message);
  }
};

export const updateQuantity = async (req, res) => {
  const cart_id = req.params.cid;
  const product_id = req.params.pid;
  const { quantity } = req.body;
  try {
    const response = await cartDao.updateQuantity(
      cart_id,
      product_id,
      quantity
    );
    res.send(response);
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    res.status(500).send(error.message);
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const cart_id = req.params.cid;
    const { purchaser } = req.body;
    if (!purchaser) throw new Error("Cannot purchase without an email");
    let not_available_products = [];
    let amount = 0;

    const cart_products = await cartDao.getCartProducts(cart_id);
    if (cart_products.length === 0)
      throw new Error(
        "Cannot purchase because there are no products in the cart"
      );

    cart_products.forEach(async (product) => {
      if (product.quantity > product.product_id.stock) {
        not_available_products.push(product);
      } else {
        amount += product.quantity * product.product_id.price;
        await productFactory.updateProduct(product.product_id._id, {
          stock: product.product_id.stock - product.quantity,
        });
      }
    });

    await cartDao.updateAfterPurchase(cart_id, not_available_products);

    const newTicket = await createTicket(amount, purchaser);
    res.send(newTicket);
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
