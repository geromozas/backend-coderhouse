# Ecommerce Tienda de Moto

Este es un proyecto de ecommerce de tienda de motos desarrollado como parte del curso de backend brindado por CoderHouse. El proyecto permite la creación de usuarios, gestión de productos, y compras, entre otras funcionalidades.

## Descripción del Proyecto

El proyecto tiene como objetivo crear una plataforma de comercio electrónico para una tienda de motos, donde los usuarios puedan registrarse, iniciar sesión, ver y comprar productos, y gestionar sus compras. Los administradores tienen funcionalidades adicionales como la gestión de productos y usuarios.

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB con Mongoose
- Handlebars para vistas
- Passport para autenticación
- Multer para manejo de archivos
- Swagger para documentación de la API
- Socket.io para comunicación en tiempo real
- Winston para logging
- Nodemailer para envío de correos
- Mocha y Chai para pruebas

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/backend-codehouse.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd backend-codehouse
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   DB_CONNECTION = "mongodb+srv://mozasgeronimo:4715147@proyectocoder.hoo0h1r.mongodb.net/ecommerce"
   DB_PORT = 8080
   DB_CLIENT_ID = "Iv1.9725fbcb86fac358"
   DB_CLIENT_SECRET = "86709731ce00bfbc7a98b0e179cb324d6870099d"
   PERSISTENCE = "MONGO"

   ```

## Ejecución

Para iniciar el servidor en modo desarrollo, ejecuta:

```bash
npm start
```

Para ejecutar las pruebas, ejecuta:

```bash
npm test
```

## Estructura del Proyecto

<!-- - `src/`
  - `controllers/` - Controladores de las rutas.
  - `models/` - Modelos de Mongoose.
  - `routes/` - Definición de las rutas.
  - `views/` - Vistas de Handlebars.
  - `middlewares/` - Middlewares personalizados.
  - `utils/` - Utilidades y helpers.
  - `index.js` - Archivo principal del servidor. -->

`src/`
`config/` - Configuración de la aplicación.
`controllers/` - Controladores de las rutas.
`dao/`
    `db/` - Acceso a la base de datos.
    `dto/` - Objetos de transferencia de datos.
    `fileSystem/` - Manejo de archivos.
    `models/` - Modelos de datos.
    `mongoManagers/` - Gestores específicos de MongoDB.
    `factory.js` - Archivo para la creación de instancias.
`docs/` - Documentación del proyecto.
`middlewares/` - Middlewares personalizados.
`mocks/` - Datos de prueba o simulados.
`public/` - Archivos estáticos accesibles públicamente.
`routes/` - Definición de las rutas de la aplicación.
`services/` - Servicios de la aplicación.
`utils/` - Utilidades y helpers genéricos.
`views/` - Vistas de la aplicación (si aplica).
`index.js` - Archivo principal del servidor.

## Documentación de la API

La documentación de la API se genera automáticamente con Swagger. Una vez que el servidor esté en funcionamiento, puedes acceder a la documentación en `http://localhost:3000/api-docs`.

## Endpoints Principales

### Usuarios

- `POST /api/users/register` - Registro de nuevos usuarios.
- `POST /api/users/login` - Inicio de sesión de usuarios.
- `GET /api/users/logout` - Cierre de sesión de usuarios.
- `GET /api/users/current` - Obtención de datos del usuario logueado.

### Productos

- `GET /api/products` - Obtención de todos los productos.
- `GET /api/products/:id` - Obtención de un producto por su ID.
- `POST /api/products` - Creación de un nuevo producto (requiere rol de administrador).
- `PUT /api/products/:id` - Actualización de un producto existente (requiere rol de administrador).
- `DELETE /api/products/:id` - Eliminación de un producto (requiere rol de administrador).

### Carritos de Compra

- `GET /api/carts` - Obtención de los carritos de compra del usuario.
- `POST /api/carts` - Creación de un nuevo carrito de compra.
- `PUT /api/carts/:id` - Actualización de un carrito de compra.
- `DELETE /api/carts/:id` - Eliminación de un carrito de compra.

### Compras

- `POST /api/purchases` - Realización de una compra.

## Funcionalidades Adicionales

- Envío de correos de confirmación de compra.
- Gestión de roles y permisos de usuarios.
- Paginación y filtrado de productos.
- Manejo de archivos para subir imágenes de productos.

## Contacto

Si tienes alguna pregunta o sugerencia, por favor contacta a [mozasgeronimo@gmail.com](mailto:mozasgeronimo@gmail.com).

```

```
