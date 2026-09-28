# API Clon de Instagram

## 1. Selección y análisis de la API

- **Nombre del proyecto:** Clon de Instagram - Backend (`tp-backend-instagram-clon`).
- **Descripción:** API REST que permite registrar usuarios, iniciar sesión (JWT), consultar y editar
  el perfil propio, y publicar, ver y eliminar publicaciones (feed).
- **Tipo de API:** propia, desarrollada por el grupo.
- **URL base:** `http://localhost:3000`
- **Base de datos:** PostgreSQL (`usuarios` y `publicaciones`, ver `sql/create_tables.sql`).

### Endpoints

| Método | Endpoint | Protegido | Descripción |
|---|---|---|---|
| GET    | `/`                          | No  | Chequeo rápido de que el servidor está vivo |
| POST   | `/api/auth/register`         | No  | Registra un nuevo usuario (password hasheada con bcrypt) |
| POST   | `/api/auth/login`            | No  | Valida credenciales y devuelve un token JWT |
| GET    | `/api/usuarios/perfil`       | Sí  | Devuelve el perfil del usuario autenticado y sus publicaciones |
| PUT    | `/api/usuarios/perfil`       | Sí  | Edita nombre completo, biografía y/o foto de perfil |
| GET    | `/api/publicaciones`         | No  | Feed global de publicaciones (join con datos del autor) |
| POST   | `/api/publicaciones`         | Sí  | Crea una publicación asociada al usuario autenticado |
| DELETE | `/api/publicaciones/:id`     | Sí  | Elimina una publicación propia (403 si no es el dueño) |

Las rutas "Sí" (protegidas) requieren el header `Authorization: Bearer <token>`, obtenido del login.

## 2. Cómo levantar el proyecto

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear la base de datos en PostgreSQL y ejecutar `sql/create_tables.sql` (crea las tablas e
   inserta 2 usuarios y 2 publicaciones de prueba; ambos usuarios tienen password `123456`).
3. Copiar `.env.example` a `.env` y completar los datos de conexión a tu PostgreSQL local.
4. Levantar el servidor:
   ```bash
   npm run dev   # con recarga automática
   # o
   npm start
   ```
5. Abrir la documentación interactiva en **http://localhost:3000/api-docs**.

## 3. Documentación con Swagger

Se usó `swagger-autogen` + `swagger-ui-express` (`swagger.js`, `src/app.js`). El archivo
`swagger-output.json` es el spec generado; se regenera con:

```bash
node swagger.js
```

corriendo este comando cada vez que se agreguen o cambien rutas. La documentación incluye,
por endpoint: método, ruta, descripción, parámetros (path/header/body con tipos) y códigos de
respuesta posibles, además de los modelos de datos (`Usuario`, `Publicacion`, etc.) usados en
los bodies y respuestas.

## 4. Códigos de respuesta utilizados

| Código | Cuándo ocurre |
|---|---|
| 200 | Operación exitosa (login, obtener/editar perfil, feed, eliminar publicación) |
| 201 | Recurso creado (registro de usuario, nueva publicación) |
| 400 | Datos inválidos o faltantes, email/usuario duplicado, id no numérico en DELETE |
| 401 | Credenciales inválidas, falta el token o es inválido/expirado |
| 403 | Se intenta eliminar una publicación que no pertenece al usuario autenticado |
| 404 | Usuario o publicación no encontrada |
| 500 | Error inesperado del servidor o de la base de datos |
