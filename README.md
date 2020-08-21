# Práctica de RESTful API con Node.js y MongoDB

Esta práctica fue realizada con la ayuda de Matt en [Academind](https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w).  
Consta de la creación de una API REST y se usaron los siguientes recursos:
- Node.js | Express.js
- MongoDB | Mongoose
- JWT para generar el token de autenticación
- [bcrypt](https://www.npmjs.com/package/bcrypt) como método para hacer el hash y la verificación al hacer login 
- [multer](https://www.npmjs.com/package/multer) middleware para manejar la subida de archivos a través de FormData requests
-  [dotenv](https://www.npmjs.com/package/dotenv) para generar variables de ambiente de manera local
-  [morgan](https://www.npmjs.com/package/morgan) para generar logs al recibir cualquier solicitud del servidor


## Instalación

Clona el repositorio a tu dispositivo local descargando el archivo ZIP o ejecutando el siguiente comando en tu terminal:

```bash
git clone https://github.com/randrerd/academind-rest-api-practice.git
```

Luego, necesitas descargar e instalar las dependencias del repositorio ejecutando el siguiente comando:

```bash
npm install
```

Y por último, para inicializar el servidor deberás ejecutar:

```bash
npm run start
```

## Uso

Para hacer uso del servidor y de la API que instalaste, necesitarás alguna herramienta de desarrollo de API como [Postman](https://www.postman.com/) para probar los distintos endpoints creados.

## Endpoints
Con Postman puedes hacer solicitudes a las siguientes rutas sin autorización:
- Users:  
POST  
'http://localhost:3000/users/signup' | 'http://localhost:3000/users/login'   
Body válido: {"email": "email@address.com", "password": "anypassword"}   
- Products:  
GET  
'http://localhost:3000/products' | 'http://localhost:3000/products/:productId'  

Para enviar las siguientes solicitudes necesitas enviar como header el token de autorización con el cual te responde el servidor al hacer login de la siguiente manera:  
Key: Authorization | Value: Bearer [TOKEN]
- Products:  
POST  
'http://localhost:3000/products'  
Body válido: 
FormData con los keys: "name" | "price" | "productImage" (archivo jpeg)  
PATCH  
'http://localhost:3000/products/:productId'  
Body válido: [{"propName": "price", "value": 2.95}]  
DELETE  
'http://localhost:3000/products/:productId'  
- Orders:  
GET  
'http://localhost:3000/orders' | 'http://localhost:3000/orders/:orderId'  
POST  
'http://localhost:3000/orders'   
Body válido: {"productId": "productIdValue", "quantity": 1}  
DELETE  
'http://localhost:3000/products/:productId'  



-----
