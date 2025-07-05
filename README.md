# Sistema de Registro de Atención Tutorial - Backend  

API para gestionar registros de atención tutorial, desarrollada en Node.js + Express.  

## Características  
- Registro de sesiones de tutoría  
-  

## Tecnologías  
- Node.js  
- Express
- Mysql  
- postgres
    npm i pg
    npm install --save-dev @types/pg

## Instalación  
1. Clona el repositorio  
2. `npm install`  
3. Configura `.env` (ver `.env.example`)  
4. `npm start`  
5. para compilar: `npm run build`
6. Para desarrollo:  `npm run dev`

## Dependencia
- excel
    `npm install exceljs`
- mysql2
    `npm install mysql2`
- cors
    `npm install cors`
- ts-node-dev
    `npm install ts-node-dev --save-dev`
- multer
    `npm install multer`
    Ejecuta este comando en la raíz de tu proyecto:
    `npm install --save-dev @types/multer`
    Esto instala las definiciones de tipos necesarias para que TypeScript reconozca multer.

## Endpoint
1. inicio sesion
    * GET 
        - http://localhost:3000/api/inicio_sesion/inicio_sesion/:dni/:contrasena
2. Usuario:
    * GET
        - http://localhost:3000/api/usuario/recuperar_usuario/2
        - http://localhost:3000/api/usuario/buscar_usuario/                 
    * POST
        - http://localhost:3000/api/usuario/insert_usuario  
        - http://localhost:3000/api/usuario/verificar_actualizar_clave 
        - http://localhost:3000/api/usuario/verificar_dni 
    * PUT 
        - http://localhost:3000/api/usuario/actualizar_usuario/          
        - http://localhost:3000/api/usuario/update_usuario_imagenPerfil 

3. Registro
    