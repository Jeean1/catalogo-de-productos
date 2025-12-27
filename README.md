# Catálogo de Productos

Pequeña aplicación de ejemplo con backend en Express (Node.js) y frontend con Vite + React.

**Requisitos**

- **Node**: v16+ recomendada
- **npm**: v8+ o el que venga con tu Node
- **Base de datos**: Microsoft SQL Server (el backend usa `mssql`)

**Instalación (global)**

- **Clonar repo**: `git clone <git@github.com:Jeean1/catalogo-de-productos.git>` y abrir la carpeta raíz del proyecto.

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
