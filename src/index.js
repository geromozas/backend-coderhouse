import express from "express";
import handlebars from "express-handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { dataBaseConnection } from "./dao/db/index.js";
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { MongoProductManager } from "./dao/mongoManagers/mongoProductManager.js";
import sessionRouter from "./routes/sessions.routes.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import { initPassport } from "./config/passport.config.js";
import passport from "passport";
import { mockRouter } from "./routes/mock.routes.js";
import { addLogger } from "./middleware/logger.middleware.js";
import { program } from "./config/commander.config.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//FileSystem
// import { ProductManager } from "./productManager.js";
// import { CartManager } from "./cartManager.js";
// export const productManager = new ProductManager();
// export const cartManager = new CartManager();

const app = express();
// const PORT = config.dbPort;
const server = createServer(app);

export const mongoProductManager = new MongoProductManager();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "E-commerce API",
      description: "API documentation for E-commerce project",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//HANDLEBARS
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(addLogger);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://mozasgeronimo:4715147@proyectocoder.hoo0h1r.mongodb.net/ecommerce",
      ttl: 15,
    }),
    secret: "secretCoder", //encripto la info
    resave: true, //guarde cuando haya inactividad
    saveUninitialized: true, //guarda un objeto vacio
  })
);

initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.redirect("/views/login");
});

app.use("/api/mock", mockRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/views", viewsRouter);
app.use("/api/sessions", sessionRouter);

app.get("/loggerTest", (req, res) => {
  req.logger.debug(
    `Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`
  );
  req.logger.http(
    `Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`
  );
  req.logger.info(
    `Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`
  );
  req.logger.warning(
    `Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`
  );
  req.logger.error(
    `Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`
  );
  req.logger.fatal(
    `Method:${req.method} - URL:${req.url} - ${new Date().toLocaleString()}`
  );
  res.send("Loggers created successfully");
});

app.get("/views/cart", (req, res) => {
  if (!req.session.cart || !req.session.user) {
    return res.redirect("/views/login"); 
  }

  res.render("cart", {
    products: req.session.cart.products,
    cart_id: req.session.cart._id,
    session: req.session,
  });
});

//SOCKET
export const io = new Server(server);

server.listen(program.opts().p, (req, res) => {
  console.log(`listening on port ${program.opts().p}`);
  dataBaseConnection();
});
