# Proyecto Final Talento Tech - Backend con Node.js + Express

API REST de productos desarrollada como entrega del proyecto final para la cursada de Backend con Node.js + Express de Talento Tech.

## Tecnologías

- [Node.js](https://nodejs.org/)
- [Express 5](https://expressjs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [nodemon](https://nodemon.io/) (desarrollo)
- [pnpm](https://pnpm.io/) como gestor de paquetes

## Requisitos

- Node.js 18 o superior
- pnpm

## Instalación

```bash
pnpm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
BACKEND_URL=http://localhost:3000
```

El puerto del servidor se toma de `BACKEND_URL`. Si la variable no está definida, se usa el puerto `3000` por defecto.

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
├── index.js                          # Punto de entrada del servidor
├── src/
│   ├── data/
│   │   └── products.js               # Datos locales de productos (temporal)
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

| Método | Endpoint          | Descripción                    |
| ------ | ----------------- | ------------------------------ |
| GET    | `/`               | Mensaje de bienvenida          |
| GET    | `/api/products`   | Lista todos los productos      |
| GET    | `/api/products/:id` | Obtiene un producto por ID   |
| POST   | `/api/products`   | Crea un nuevo producto         |
| PUT    | `/api/products/:id` | Actualiza un producto por ID |
| DELETE | `/api/products/:id` | Elimina un producto por ID   |

### Ejemplo de producto

```json
{
  "id": 1,
  "name": "Producto 1",
  "description": "Descripción del producto 1",
  "price": 10.99,
  "stock": 100
}
```

### Ejemplos de uso

```bash
# Obtener todos los productos
curl http://localhost:3000/api/products

# Obtener un producto por ID
curl http://localhost:3000/api/products/1

# Crear un producto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Producto 4","description":"Nuevo","price":9.99,"stock":25}'

# Actualizar un producto
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":12.99}'

# Eliminar un producto
curl -X DELETE http://localhost:3000/api/products/1
```

## Notas

- Los datos se almacenan en memoria (`src/data/products.js`), por lo que se pierden al reiniciar el servidor.
- Próximamente se integrará una base de datos (Firebase) en reemplazo de los datos locales.

## Autor

Alfredo A. Perez M.

## Licencia

MIT
