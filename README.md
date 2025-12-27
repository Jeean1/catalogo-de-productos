# Catálogo de Productos

Pequeña aplicación de ejemplo con backend en Express (Node.js) y frontend con Vite + React.

**Requisitos**

- **Node**: v16+ recomendada
- **npm**: v8+ o el que venga con tu Node
- **Base de datos**: Microsoft SQL Server (el backend usa `mssql`)

**Instalación (global)**

- **Clonar repo**: `git clone git@github.com:Jeean1/catalogo-de-productos.git` y abrir la carpeta raíz del proyecto.

**Backend**

- **Carpeta**: [backend](backend)
- **Instalar dependencias**:

  ```bash
  cd backend
  npm install
  ```

- **Variables de entorno**: crea un archivo `.env` en `backend` con (ejemplo):

  ```env
  DB_USER=sa
  DB_PASSWORD=TuPassWord
  DB_NAME=CatalogoDB
  DB_HOST=localhost
  PORT=4000
  ```

- **Ejecutar servidor**:

  ```bash
  npm start
  ```

  El servidor por defecto corre en `http://localhost:3000` (si `PORT` no está definido).

**Frontend**

- **Carpeta**: [frontend](frontend)
- **Instalar dependencias**:

  ```bash
  cd frontend
  npm install
  ```

- **Ejecutar en modo desarrollo**:

  ```bash
  npm run dev
  ```

  Abre `http://localhost:5173` en tu navegador (Vite).

**Base de datos**

- Los scripts para crear la base y datos de ejemplo están en:
  - [database (scripts)/scripts.sql](<database%20(scripts)/scripts.sql>)
  - [database (scripts)/seeds.sql](<database%20(scripts)/seeds.sql>)
- Puedes ejecutar los scripts con SQL Server Management Studio o `sqlcmd`:

  ```bash
  sqlcmd -S localhost -U SA -P 'TuPassword' -i "database (scripts)/scripts.sql"
  ```

**Notas importantes**

- El backend permite CORS desde `http://localhost:5173` (configurado en `backend/src/app.js`).
- El proyecto usa `dotenv`; asegúrate de configurar correctamente las variables de entorno.

**Comandos útiles**

- **Backend**: `npm start` (ejecutar en `backend`)
- **Frontend**: `npm run dev`, `npm run build`, `npm run preview` (en `frontend`)

**Estructura relevante**

- **Backend código**: [backend/src](backend/src)
- **Frontend código**: [frontend/src](frontend/src)
- **Scripts DB**: [database (scripts)](<database%20(scripts)>)


## Postman

La colección completa de la API se encuentra disponible en el siguiente link público:

https://roux-team.postman.co/workspace/Team-Workspace~6d9b36b9-20d1-4e44-84fd-8d043e72330f/collection/22441762-9686dfd6-d645-440b-a306-b638c353f42d?action=share&creator=22441762&action_performed=accountSelect&authFlowId=3f977a08-56ed-461b-a8de-ff0b922e8267

Desde ahí se puede importar directamente en Postman.



