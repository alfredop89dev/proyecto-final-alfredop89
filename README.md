# Proyecto Final Talento Tech - Backend con Node.js + Express

API REST de productos desarrollada como entrega del proyecto final para la cursada de Backend con Node.js + Express de Talento Tech.

## Tecnologías

- [Node.js](https://nodejs.org/) (18 o superior)
- [Express 5](https://expressjs.com/)
- [Firebase / Firestore](https://firebase.google.com/) como base de datos
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)
- [nodemon](https://nodemon.io/) (desarrollo)
- [pnpm](https://pnpm.io/) como gestor de paquetes

## Requisitos

- Node.js 18 o superior
- pnpm
- Un proyecto de Firebase con Firestore habilitado

## Instalación

```bash
pnpm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto (no se versiona). Completa los valores con los datos de tu proyecto de Firebase:

```env
BACKEND_URL=http://localhost:3000

API_KEY=tu_api_key
AUTH_DOMAIN=tu_proyecto.firebaseapp.com
PROJECT_ID=tu_proyecto
STORAGE_BUCKET=tu_proyecto.firebasestorage.app
MESSAGING_SENDER_ID=tu_messaging_sender_id
APP_ID=tu_app_id
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

## Ejecución

```bash
# Producción
pnpm start

# Desarrollo (recarga automática)
pnpm dev
```

El servidor queda disponible en `http://localhost:3000`.

## Estructura del proyecto

```
.
├── index.js                          # Punto de entrada y configuración de Express
├── src/
│   ├── config/
│   │   └── db.js                     # Conexión a Firestore
│   ├── models/
│   │   └── products.model.js         # Lógica de acceso a datos
│   ├── controllers/
│   │   └── products.controller.js    # Controladores de la API
│   ├── middlewares/
│   │   ├── products.middleware.js    # Validación de productos
│   │   ├── notFound.middleware.js    # Manejo de rutas no encontradas
│   │   └── errorHandler.middleware.js # Manejo global de errores
│   └── routes/
│       └── products.route.js         # Definición de rutas
└── package.json
```

## Endpoints

Base URL: `/api`

| Método | Endpoint            | Descripción                        |
| ------ | ------------------- | ---------------------------------- |
| GET    | `/`                 | Mensaje de bienvenida              |
| GET    | `/api/products`     | Lista todos los productos          |
| GET    | `/api/products/:id` | Obtiene un producto por ID         |
| POST   | `/api/products`     | Crea un nuevo producto             |
| PUT    | `/api/products/:id` | Actualiza un producto por ID       |
| DELETE | `/api/products/:id` | Elimina un producto por ID         |

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
| `404` | Producto o ruta no encontrada |
| `409` | Ya existe otro producto con ese nombre y categoría (en `POST` o `PUT`) |
| `500` | Error interno del servidor |

### Ejemplos de uso

```bash
# Obtener todos los productos
curl http://localhost:3000/api/products

# Obtener un producto por ID
curl http://localhost:3000/api/products/abc123

# Crear un producto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Producto 4","description":"Nuevo","price":9.99,"category":"Categoria","stock":25,"image":"https://ejemplo.com/producto4.jpg"}'

# Actualizar un producto
curl -X PUT http://localhost:3000/api/products/abc123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Producto 4","description":"Actualizado","price":12.99}'

# Eliminar un producto
curl -X DELETE http://localhost:3000/api/products/abc123
```

## Notas

- La conexión a Firestore se configura en `src/config/db.js`.
- Recuerda configurar las reglas de seguridad de Firestore según tu entorno. En desarrollo puede ser necesario permitir el acceso a la colección `products`.
- El archivo `.env` contiene credenciales y no debe subirse al repositorio.

## Autor

Alfredo A. Perez M.

## Licencia

MIT
