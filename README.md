## T U T O

Aplicación de gestión de tutorías.

### Links relacionados

[Despliegue Backend](https://tuto-js-backend.herokuapp.com/)

[Despliegue Frontend](https://tuto-js-frontend.netlify.app/)

[Exposición](https://youtu.be/eWAJpfEIrKo)

[Documentación](https://documenter.getpostman.com/view/5107072/UyxqAhrt)


### Pruebas
![Pruebas](https://i.postimg.cc/N0Rk4pWK/test-tuto.png)

### Sobre el proyecto

* Versión de Node: v16.15.0

#### Backend

Variables de entorno necesarias

* MONGODB_TUTO_URL: URL de la base de datos de producción.
* MONGODB_TUTO_URL_TEST: URL de la base de datos de prueba.
* SENDGRID_API_KEY: API Key de SendGrid para el envío de correos.
* SECRET_KEY: Key para el cifrado de token.
* CLOUDINARY_CLOUD_NAME: Cloud Name de Cloudinary.
* CLOUDINARY_API_KEY: Api Key de Cloudinary.
* CLOUDINARY_API_SECRET; Api Secret de Cloudinary.
* REACT_APP_TUTO_URL: Url del frontend.

Comandos disponibles

* npm start: nodemon server.js
* npm test: set NODE_ENV=test&& jest
* npm test:watch: jest --watch
* npm server-test: set NODE_ENV=test&& nodemon server.js
* npm test:coverage: set NODE_ENV=test&& jest --coverage"

Dependencias

* @babel/plugin-transform-modules-commonjs: ^7.17.9
* @sendgrid/mail: ^7.6.2
* axios: ^0.26.1
* bcrypt: ^5.0.1
* cloudinary: ^1.28.1
* cors: ^2.8.5
* dotenv: ^16.0.0
* express: ^4.17.2
* http: ^0.0.1-security
* jest: ^27.5.1
* jsonwebtoken: ^8.5.1
* mongoose: ^6.2.0
* multer: ^1.4.4
* nodemon: ^2.0.15
* socket.io: ^4.5.1
* streamifier: ^0.1.1


#### Frontend

Variables de entorno necesarias

* REACT_APP_TUTO_HEROKU_EXT: URL del backend.

Comandos disponibles

* npm start: react-scripts start
* npm build: react-scripts build
* npm test: react-scripts test
* npm eject: react-scripts eject

Dependencias

* @emotion/styled: ^11.8.1
* @mui/icons-material: ^5.5.1
* @mui/material: ^5.5.1
* @mui/styled-engine-sc: ^5.4.2
* @mui/x-data-grid: ^5.7.0
* ajax: ^0.0.4
* axios: ^0.26.1
* react: ^17.0.2
* react-dom: ^17.0.2
* react-router-dom: ^6.2.2
* react-scripts: 5.0.0
* socket.io-client: ^4.5.1
* styled-components: ^5.3.3