import { Products } from "../dao/factory.js";
import { io } from "../index.js";
import { generateProduct } from "../mocks/product.mocks.js";

export const productFactory = new Products();

export const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const products = await productFactory.getProducts(limit, page, query, sort);
    return res.json(products);
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.log(error);
    res.status(500).send("Error en intentar recibir los productos");
  }
};

export const getProductsById = async (req, res) => {
  try {
    const product_id = req.params.pid;
    const products = await productFactory.getProductsById(product_id);
    res.json(products);
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.log(error);
    res
      .status(500)
      .send(`Error en intentar recibir el producto con id ${req.params.pid}`);
  }
};

export const addProduct = async (req, res) => {
  try {
    const productAdded = await productFactory.addProduct(req.body);
    io.emit("productAdded", productAdded);
    res.json(productAdded);
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.log(error);
    res.status(500).send(`Error en intentar agregar el producto`);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product_id = req.params.pid;
    const response = await productFactory.updateProduct(product_id, req.body);
    res.json(response);
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.log(error);
    res.status(500).send(`Error en intentar editar el producto con id ${pid}`);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.pid;
    const response = await productFactory.deleteProduct(id);
    res.send("Producto eliminado exitosamente");
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.log(error);
    res
      .status(500)
      .send(`Error en intentar eliminar el producto con id ${pid}`);
  }
};

export const getMockProducts = async (req, res) => {
  try {
    const products = [];
    for (let i = 0; i < 50; i++) {
      products.push(generateProduct());
    }
    res.send({ status: "success", payload: products });
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.log(error);
    res.status(500).send("Error mocks");
  }
};
