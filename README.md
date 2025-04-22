# Sistema de Registro de Atención Tutorial - Backend  

API para gestionar registros de atención tutorial, desarrollada en Node.js + Express.  

## Características  
- Registro de sesiones de tutoría  
-  

## Tecnologías  
- Node.js  
- Express  

## Instalación  
1. Clona el repositorio  
2. `npm install`  
3. Configura `.env` (ver `.env.example`)  
4. `npm start`  
5. Para desarrollo:  `npm run dev`

## Dependencia
- excel
    `npm install exceljs`

- ts-node-dev
    `npm install ts-node-dev --save-dev`

## Endpoint
1. inicio sesion
    * GET 
        - http://localhost:3000/api/inicio_sesion/inicio_sesion/:dni/:contrasena
2. Usuario:
    * GET
        - http://localhost:3000/api/usuario/recuperar_usuario/2
        - http://localhost:3000/api/usuario/buscar_usuario/  