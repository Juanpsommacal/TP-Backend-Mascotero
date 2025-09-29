# 🐾 Backend Mascotero

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

API backend para gestión de usuarios, productos y pedidos con autenticación vía JWT en cookies HTTPOnly.

## 📚 Tabla de contenidos
- [Tecnologías usadas](#-tecnologías-usadas)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Estructura de carpetas](#-estructura-de-carpetas)
- [Base de datos y modelos](#-base-de-datos-y-modelos)
- [Autenticación](#-autenticación)
- [Endpoints](#-endpoints)
- [Ejemplos de uso con curl](#-ejemplos-de-uso-con-curl)
- [Notas](#-notas)

## 🚀 Tecnologías usadas
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcryptjs (hash de contraseñas)
- Cookie-Parser (manejo de cookies HTTPOnly)
- CORS
- Express-Session
- Winston (logger)
- Mongoose Paginate v2

## 🧰 Requisitos previos
- Node.js 18+
- MongoDB (Atlas o local)

## 🛠️ Instalación
1) Clonar el repo y entrar a la carpeta del proyecto.
2) Instalar dependencias:
```
npm install
```
3) Crear archivo `.env` en la raíz con al menos:
```
MONGO_DB_CONNECTION_STRING=mongodb://localhost:27017/mascotero
```
4) Levantar el servidor:
```
npm run dev
```
El servidor corre por defecto en `http://localhost:3000`.

## 📁 Estructura de carpetas
```
backend-mascotero-utn/
├─ index.js
├─ package.json
├─ src/
│  ├─ core/
│  │  ├─ config.js              # lee variables de entorno
│  │  ├─ db.js                  # conexión a MongoDB
│  │  └─ logger.js              # logger Winston
│  ├─ controllers/
│  │  ├─ loginController.js     # login, checkAuthStatus, logout
│  │  ├─ pedidoController.js    # crear pedidos
│  │  ├─ productosController.js # crear/listar productos
│  │  └─ userController.js      # CRUD usuario
│  ├─ middleware/
│  │  └─ verifyTokenMiddleware.js # valida JWT desde cookie
│  ├─ models/
│  │  ├─ pedidoModel.js         # modelo Pedido con pedidoId autoincremental
│  │  ├─ productModel.js        # modelo Producto
│  │  └─ userModel.js           # modelo Usuario
│  ├─ routers/
│  │  ├─ loginRouter.js
│  │  ├─ pedidoRouter.js
│  │  ├─ productosRouter.js
│  │  └─ userRouter.js
│  └─ services/
│     ├─ loginService.js
│     ├─ pedidoService.js
│     ├─ productosService.js    # (si existe; usado por controller)
│     └─ userService.js
└─ .gitignore
```

## 🗄️ Base de datos y modelos
Conexión configurada en `src/core/db.js` usando `MONGO_DB_CONNECTION_STRING` (ver `.env`).

### 👤 Modelo Usuario (`src/models/userModel.js`)
Campos principales:
- name: String, required, [2..20], trim, lowercase
- lastName: String, required, [2..20], trim, lowercase
- email: String, required, unique, formato email, [6..30], trim, lowercase
- password: String, required, validada por `isGoodPassword`, se hashea en `pre('save')`
- phone: String, required, [6..15], trim, lowercase
- timestamps: true

### 🛒 Modelo Producto (`src/models/productModel.js`)
- name: String, required, [2..30], trim, lowercase
- description: String, required, [2..100], trim, lowercase
- price: Number, required
- timestamps: true
- plugin: `mongoose-paginate-v2`

### 📦 Modelo Pedido (`src/models/pedidoModel.js`)
- pedidoId: Number, required, unique, index, asignado automáticamente e incremental (1,2,3,...) mediante colección `counters` y hook `pre('validate')`.
- userId: String, required
- items: Array, required
- total: Number, required
- userPhone: Number, required
- timestamps: true
- Nota: Se mantiene el `_id` de Mongo (ObjectId) además de `pedidoId`.

## 🔐 Autenticación
- Se usa JWT. El token se entrega en cookie `accessToken` (HTTPOnly) desde `POST /api/login`.
- Rutas protegidas usan `verifyTokenMiddleware` y requieren que el cliente envíe la cookie.
- Para peticiones cross-site desde frontend, usar `credentials: true` (fetch/axios) y el servidor ya expone CORS con `credentials: true`.

## 📡 Endpoints
A menos que se indique, el Content-Type es `application/json`.

### 🔑 Auth
- POST `/api/login`
  - Cookies: No requiere cookie de entrada. Devuelve cookie `accessToken` (HTTPOnly).
  - Body (JSON):
    ```json
    { "email": "test@example.com", "password": "Password1" }
    ```
  - Respuesta: `{ message, user }` y setea cookie.

- GET `/api/auth/status`
  - Cookies: Requiere cookie `accessToken` (enviada por el cliente).
  - Body: ninguno.
  - Respuesta:
    ```json
    {
      "isAuthenticated": true,
      "user": { "id": "...", "email": "...", "name": "...", "lastName": "...", "phone": "..." }
    }
    ```

- POST `/api/logout`
  - Cookies: Requiere cookie `accessToken` para poder limpiar.
  - Body: ninguno.
  - Efecto: Limpia la cookie `accessToken`.

### 👥 Usuarios (`/api/user`)
- POST `/api/user/create`
  - Cookies: No
  - Body (JSON):
    ```json
    {
      "name": "Juan",
      "lastName": "Pérez",
      "email": "juan@example.com",
      "password": "Passw0rd",
      "phone": "11223344"
    }
    ```

- GET `/api/user/user/:id`
  - Cookies: Sí (requiere `accessToken`)
  - Body: ninguno

- DELETE `/api/user/delete/:id`
  - Cookies: Sí (requiere `accessToken`)
  - Body: ninguno

- PUT `/api/user/update/:id`
  - Cookies: Sí (requiere `accessToken`)
  - Body (JSON): campos a actualizar del usuario

### 🧩 Productos (`/api/productos`)
- GET `/api/productos/`
  - Cookies: No
  - Query params opcionales: `page`, `limit`

- POST `/api/productos/create`
  - Cookies: No
  - Body (JSON):
    ```json
    { "name": "Collar", "description": "Collar de nylon", "price": 1200 }
    ```

### 🧾 Pedidos (`/api/pedido`)
- POST `/api/pedido/create`
  - Cookies: Sí (requiere `accessToken`)
  - Body (JSON):
    ```json
    {
      "userId": "<id-de-usuario-o-ref>",
      "items": [ { "sku": "ABC", "qty": 1, "price": 100 } ],
      "total": 100,
      "userPhone": 11223344
    }
    ```
  - Respuesta:
    ```json
    { "message": "Pedido creado", "pedidoId": 1 }
    ```

## 🧪 Ejemplos de uso con curl
- Login (guarda cookie en `cookies.txt`):
```
curl -i -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password1"}' \
  -c cookies.txt
```
- Estado de auth (envía cookie):
```
curl -i http://localhost:3000/api/auth/status -b cookies.txt
```
- Crear producto:
```
curl -i -X POST http://localhost:3000/api/productos/create \
  -H "Content-Type: application/json" \
  -d '{"name":"Collar","description":"Collar de nylon","price":1200}'
```
- Crear pedido (requiere cookie de login):
```
curl -i -X POST http://localhost:3000/api/pedido/create \
  -H "Content-Type: application/json" \
  -d '{"userId":"123","items":[{"sku":"ABC","qty":1,"price":100}],"total":100,"userPhone":11223344}' \
  -b cookies.txt
```
