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

En `POST` y `PUT` son obligatorios `name`, `description` y `price`. Si falta alguno se responde con `400`. `stock` es opcional.

### Ejemplo de producto

```json
{
  "id": "abc123",
  "name": "Producto 1",
  "description": "Descripción del producto 1",
  "price": 10.99,
  "stock": 100
}
```

### Códigos de respuesta

| Código | Situación |
| ------ | --------- |
| `200` | Operación exitosa |
| `201` | Producto creado |
| `400` | Faltan campos requeridos o el JSON es inválido |
| `404` | Producto o ruta no encontrada |
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
  -d '{"name":"Producto 4","description":"Nuevo","price":9.99,"stock":25}'

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
