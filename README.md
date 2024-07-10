Ecommerce Tienda de Moto
Este es un proyecto de ecommerce de tienda de motos desarrollado como parte del curso de backend brindado por CoderHouse. El proyecto permite la creación de usuarios, gestión de productos, y compras, entre otras funcionalidades.

Descripción del Proyecto
El proyecto tiene como objetivo crear una plataforma de comercio electrónico para una tienda de motos, donde los usuarios puedan registrarse, iniciar sesión, ver y comprar productos, y gestionar sus compras. Los administradores tienen funcionalidades adicionales como la gestión de productos y usuarios.

Tecnologías Utilizadas
Node.js
Express
MongoDB con Mongoose
Handlebars para vistas
Passport para autenticación
Multer para manejo de archivos
Swagger para documentación de la API
Socket.io para comunicación en tiempo real
Winston para logging
Nodemailer para envío de correos
Mocha y Chai para pruebas
Instalación
Clona el repositorio:
bash
Copiar código
git clone https://github.com/tu_usuario/backend-codehouse.git
Navega al directorio del proyecto:
bash
Copiar código
cd backend-codehouse
Instala las dependencias:
bash
Copiar código
npm install
Configura las variables de entorno. Crea un archivo .env en la raíz del proyecto con las siguientes variables:
env
Copiar código
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos
JWT_SECRET=tu_secreto_jwt
GITHUB_CLIENT_ID=tu_github_client_id
GITHUB_CLIENT_SECRET=tu_github_client_secret
GMAIL_USER=tu_usuario_gmail
GMAIL_PASS=tu_contraseña_gmail
Ejecución
Para iniciar el servidor en modo desarrollo, ejecuta:

bash
Copiar código
npm start
Para ejecutar las pruebas, ejecuta:

bash
Copiar código
npm test
Estructura del Proyecto
src/
controllers/ - Controladores de las rutas.
models/ - Modelos de Mongoose.
routes/ - Definición de las rutas.
views/ - Vistas de Handlebars.
middlewares/ - Middlewares personalizados.
utils/ - Utilidades y helpers.
index.js - Archivo principal del servidor.
Documentación de la API
La documentación de la API se genera automáticamente con Swagger. Una vez que el servidor esté en funcionamiento, puedes acceder a la documentación en http://localhost:3000/api-docs.

Endpoints Principales
Usuarios
POST /api/users/register - Registro de nuevos usuarios.
POST /api/users/login - Inicio de sesión de usuarios.
GET /api/users/logout - Cierre de sesión de usuarios.
GET /api/users/current - Obtención de datos del usuario logueado.
Productos
GET /api/products - Obtención de todos los productos.
GET /api/products/:id - Obtención de un producto por su ID.
POST /api/products - Creación de un nuevo producto (requiere rol de administrador).
PUT /api/products/:id - Actualización de un producto existente (requiere rol de administrador).
DELETE /api/products/:id - Eliminación de un producto (requiere rol de administrador).
Carritos de Compra
GET /api/carts - Obtención de los carritos de compra del usuario.
POST /api/carts - Creación de un nuevo carrito de compra.
PUT /api/carts/:id - Actualización de un carrito de compra.
DELETE /api/carts/:id - Eliminación de un carrito de compra.
Compras
POST /api/purchases - Realización de una compra.
Funcionalidades Adicionales
Envío de correos de confirmación de compra.
Gestión de roles y permisos de usuarios.
Paginación y filtrado de productos.
Manejo de archivos para subir imágenes de productos.

Contacto
Si tienes alguna pregunta o sugerencia, por favor contacta a mozasgeronimo@gmail.com.