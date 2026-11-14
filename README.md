# Proyecto Final Talento Tech - Backend con Node.js + Express

API REST de productos con autenticación JWT, desarrollada como entrega del proyecto final para la cursada de Backend con Node.js + Express de Talento Tech.

## Tecnologías

- [Node.js](https://nodejs.org/) (18 o superior)
- [Express 5](https://expressjs.com/)
- [Firebase / Firestore](https://firebase.google.com/) como base de datos
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) para autenticación
- [bcrypt](https://www.npmjs.com/package/bcrypt) para hashear contraseñas
- [body-parser](https://www.npmjs.com/package/body-parser)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)
- [nodemon](https://nodemon.io/) (desarrollo)
- [pnpm](https://pnpm.io/) como gestor de paquetes

## Requisitos

- Node.js 18 o superior
- pnpm
- Un proyecto de Firebase con Firestore habilitado

## Puesta en marcha (desde cero)

1. Clonar el repositorio e instalar las dependencias:

   ```bash
   git clone <url-del-repositorio>
   cd proyecto-final-alfredop89
   pnpm install
   ```

2. Crear un proyecto en [Firebase](https://console.firebase.google.com/) y habilitar **Firestore Database**.

3. Copiar el archivo de entorno de ejemplo y completar las credenciales:

   ```bash
   cp .env.example .env
   ```

   Editá `.env` con los datos de tu proyecto de Firebase y definí un `JWT_SECRET` propio (ver [Variables de entorno](#variables-de-entorno)).

4. Crear el usuario semilla en la colección `users`:

   ```bash
   pnpm seed
   ```

   > El seed escribe en Firestore, así que las reglas de seguridad deben permitir escritura durante el desarrollo.

5. Iniciar el servidor:

   ```bash
   pnpm start
   ```

## Variables de entorno

El archivo `.env` no se versiona. Podés generarlo a partir de `.env.example` y completar los valores con los datos de tu proyecto de Firebase:

```env
BACKEND_URL=http://localhost:3000

API_KEY=tu_api_key
AUTH_DOMAIN=tu_proyecto.firebaseapp.com
PROJECT_ID=tu_proyecto
STORAGE_BUCKET=tu_proyecto.firebasestorage.app
MESSAGING_SENDER_ID=tu_messaging_sender_id
APP_ID=tu_app_id

JWT_SECRET=una_clave_larga_y_secreta
```

| Variable | Descripción |
| --- | --- |
| `BACKEND_URL` | URL del servidor; de ella se toma el puerto. Si no está definida se usa `3000`. |
| `API_KEY` | API key del proyecto de Firebase. |
| `AUTH_DOMAIN` | Dominio de autenticación del proyecto. |
| `PROJECT_ID` | ID del proyecto de Firebase. |
| `STORAGE_BUCKET` | Bucket de almacenamiento del proyecto. |
| `MESSAGING_SENDER_ID` | ID de mensajería del proyecto. |
| `APP_ID` | ID de la aplicación web. |
| `JWT_SECRET` | Clave con la que se firman y verifican los tokens JWT. |

## Ejecución

```bash
# Producción
pnpm start

# Desarrollo (recarga automática)
pnpm dev

# Crea el usuario semilla (o migra contraseñas en texto plano a hash)
pnpm seed
```

El servidor queda disponible en `http://localhost:3000`.

## Estructura del proyecto

```
.
├── index.js                             # Punto de entrada local (app.listen)
├── package.json                         # Dependencias y scripts
├── pnpm-workspace.yaml                  # Configuración de pnpm (build de bcrypt)
├── vercel.json                          # Configuración de despliegue en Vercel
├── .env.example                         # Plantilla de variables de entorno
├── .env                                 # Variables de entorno (no versionado)
├── .gitignore
├── README.md
├── api/
│   └── index.js                         # Handler serverless para Vercel
├── scripts/
│   └── seed.users.js                    # Crea/migra el usuario semilla
└── src/
    ├── app.js                           # Configuración de Express (middlewares y rutas)
    ├── config/
    │   └── db.js                        # Conexión a Firestore
    ├── models/
    │   ├── products.model.js            # Acceso a datos de productos
    │   └── auth.model.js                # Acceso a datos de usuarios
    ├── services/
    │   ├── products.service.js          # Reglas de negocio de productos
    │   └── auth.service.js              # Validación de credenciales y firma del token
    ├── controllers/
    │   ├── products.controller.js       # Controladores de productos
    │   └── auth.controller.js           # Controlador de login
    ├── middlewares/
    │   ├── auth.middleware.js           # Verificación de JWT y roles
    │   ├── products.middleware.js       # Validación de productos
    │   ├── notFound.middleware.js       # Manejo de rutas no encontradas
    │   └── errorHandler.middleware.js   # Manejo global de errores
    └── routes/
        ├── products.route.js            # Rutas de productos
        └── auth.route.js                # Ruta de autenticación
```

## Autenticación

El login valida las credenciales contra la colección `users` de Firestore y devuelve un **Bearer token** (JWT) con vigencia de 1 hora. El token incluye `id`, `username` y `role`.

### Usuario semilla

La colección `users` debe tener al menos un documento con esta estructura:

```json
{
  "username": "admin",
  "password": "$2b$10$...",
  "role": "admin"
}
```

Las contraseñas se guardan **hasheadas con bcrypt** (`password` es el hash, no el texto plano). Para crear el usuario inicial o migrar contraseñas que estén en texto plano:

```bash
pnpm seed
```

El script `scripts/seed.users.js` crea el usuario `admin` con la contraseña `1234` si la colección está vacía, o reemplaza por su hash cualquier contraseña que aún no lo esté.

Para consumir las rutas protegidas hay que enviar el token en el header:

```
Authorization: Bearer <token>
```

## Endpoints

| Método | Endpoint                  | Autenticación      | Descripción                        |
| ------ | ------------------------- | ------------------ | ---------------------------------- |
| GET    | `/`                       | Pública            | Mensaje de bienvenida              |
| POST   | `/auth/login`             | Pública            | Devuelve el Bearer token           |
| GET    | `/api/products`           | Pública            | Lista todos los productos          |
| GET    | `/api/products/:id`       | Pública            | Obtiene un producto por ID         |
| POST   | `/api/products/create`    | Bearer + rol admin | Crea un nuevo producto             |
| PUT    | `/api/products/:id`       | Bearer + rol admin | Actualiza un producto por ID       |
| DELETE | `/api/products/:id`       | Bearer + rol admin | Elimina un producto por ID         |

Los productos se almacenan en la colección `products` de Firestore. El `id` es el identificador generado por Firestore (string).

### Campos requeridos

En `POST` todos los campos (`name`, `description`, `price`, `category`, `stock`, `image`) son requeridos. En `PUT` se puede enviar al menos uno de ellos para actualizar. Para `DELETE` solo se pasa el `id` del producto.

No se permite un producto duplicado: si ya existe otro producto con el mismo `name` y `category`, tanto `POST` como `PUT` responden con `409`.

En `PUT` la validación de duplicados tiene en cuenta los valores efectivos del producto: si solo se envía `name` o solo `category`, se compara contra el valor actual del campo que no vino en el body. Además, el propio producto queda excluido de la comparación, por lo que reenviar sus mismos `name` y `category` no genera un `409`.

Los valores de `name` y `category` se normalizan con `trim()` antes de comparar y guardar, por lo que `"Producto 1"` y `" Producto 1 "` se consideran el mismo valor.

### Ejemplo de producto

```json
{
  "id": "id asignado por Firebase",
  "name": "Producto 1",
  "description": "Descripción del producto 1",
  "price": 10.99,
  "category": "Categoria del producto",
  "stock": 100,
  "image": "Url de la imagen del producto"
}
```

### Códigos de respuesta

| Código | Situación |
| ------ | --------- |
| `200` | Operación exitosa |
| `201` | Producto creado |
| `400` | Datos inválidos, campos faltantes o JSON mal formado |
| `401` | Credenciales inválidas, token ausente o token inválido/expirado |
| `403` | Token válido pero sin el rol requerido (`admin`) |
| `404` | Producto o ruta no encontrada |
| `409` | Ya existe otro producto con ese nombre y categoría (en `POST` o `PUT`) |
| `500` | Error interno del servidor |

### Ejemplos de uso

```bash
# Login: obtener el token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"1234"}'

# Obtener todos los productos (público)
curl http://localhost:3000/api/products

# Obtener un producto por ID (público)
curl http://localhost:3000/api/products/abc123

# Crear un producto (requiere token de admin)
curl -X POST http://localhost:3000/api/products/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"Producto 4","description":"Nuevo","price":9.99,"category":"Categoria","stock":25,"image":"https://ejemplo.com/producto4.jpg"}'

# Actualizar un producto (requiere token de admin)
curl -X PUT http://localhost:3000/api/products/abc123 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"Producto 4","description":"Actualizado","price":12.99}'

# Eliminar un producto (requiere token de admin)
curl -X DELETE http://localhost:3000/api/products/abc123 \
  -H "Authorization: Bearer <token>"
```

## Despliegue en Vercel

El proyecto está adaptado a Vercel: `api/index.js` exporta la app de Express como handler serverless y `vercel.json` redirige todas las rutas a esa función. `index.js` se usa solo para desarrollo local (`pnpm start` / `pnpm dev`).

1. Importá el repositorio en Vercel.
2. Cargá las variables de entorno en **Settings → Environment Variables** (`API_KEY`, `AUTH_DOMAIN`, `PROJECT_ID`, `STORAGE_BUCKET`, `MESSAGING_SENDER_ID`, `APP_ID`, `JWT_SECRET`). No subas el archivo `.env`.
3. Ejecutá el seed **localmente** contra el mismo proyecto de Firebase (`pnpm seed`); el seed no corre en Vercel.
4. Desplegá.

> Las reglas de Firestore deben permitir las operaciones que realiza el SDK cliente. Para producción real convendría migrar al Admin SDK, pero para esta entrega el SDK cliente es suficiente.

## Notas

- La conexión a Firestore se configura en `src/config/db.js` y es compartida por todos los modelos.
- Recuerda configurar las reglas de seguridad de Firestore según tu entorno. En desarrollo puede ser necesario permitir el acceso a las colecciones `products` y `users`.
- El archivo `.env` contiene credenciales y no debe subirse al repositorio.
- La respuesta del login incluye únicamente el `token`; la contraseña nunca se devuelve.
- Si al instalar `bcrypt` pnpm bloquea los scripts de build (`ERR_PNPM_IGNORED_BUILDS`), ejecutá `pnpm approve-builds`, seleccioná `bcrypt` y luego `pnpm rebuild bcrypt`. Alternativamente, se puede usar `bcryptjs`, que no requiere compilación.
- `pnpm-workspace.yaml` contiene la configuración `allowBuilds` que habilita la compilación de `bcrypt`; conviene mantenerla versionada.

## Autor

Alfredo A. Perez M.

## Licencia

MIT
