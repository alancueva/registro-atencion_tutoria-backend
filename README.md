# Sistema de Registro de Atención Tutorial - Backend

API para gestionar registros de atención tutorial, desarrollada en Node.js + Express.

## Características

- Registro y gestión de sesiones de tutoría.
- Integración con bases de datos MySQL y PostgreSQL.
- Exportación de datos a Excel.
- Soporte para carga de archivos (multer).
- Configuración flexible mediante variables de entorno.
- Endpoints protegidos con CORS.
- Desarrollo y recarga automática con ts-node-dev.

## Tecnologías

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.npmjs.com/package/mysql2)
- [PostgreSQL](https://www.npmjs.com/package/pg)
- [ExcelJS](https://www.npmjs.com/package/exceljs)
- [Multer](https://www.npmjs.com/package/multer)
- [CORS](https://www.npmjs.com/package/cors)
- [TypeScript](https://www.typescriptlang.org/)

## Instalación

1. Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd registro-atencion_tutoria-backend
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```
3. Configura las variables de entorno:
    - Copia `.env.example` a `.env` y completa los valores necesarios.
4. Inicia el servidor:
    ```bash
    npm start
    ```
5. Para compilar el proyecto:
    ```bash
    npm run build
    ```
6. Para desarrollo con recarga automática:
    ```bash
    npm run dev
    ```

## Dependencias principales

- **exceljs**  
  Para exportar datos a archivos Excel.
  ```bash
  npm install exceljs
  ```
- **mysql2**  
  Cliente para MySQL.
  ```bash
  npm install mysql2
  ```
- **pg**  
  Cliente para PostgreSQL.
  ```bash
  npm install pg
  npm install --save-dev @types/pg
  ```
- **cors**  
  Middleware para habilitar CORS.
  ```bash
  npm install cors
  ```
- **multer**  
  Middleware para manejo de archivos.
  ```bash
  npm install multer
  npm install --save-dev @types/multer
  ```
- **ts-node-dev**  
  Herramienta para desarrollo con recarga automática.
  ```bash
  npm install ts-node-dev --save-dev
  ```
  **Rate Limiting**

  ```bash
  npm install express-rate-limit
  npm install --save-dev @types/express-rate-limit
  ```
  **JWT**
  ```bash
  npm install jsonwebtoken bcryptjs
  npm install --save-dev @types/jsonwebtoken @types/bcryptjs
  ```