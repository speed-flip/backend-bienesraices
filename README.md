# Backend Bienes

## Antes de empezar
Asegurate de tener una cuenta en [Mongo db](https://www.mongodb.com)
- Crea un cluster y consigue el string de conexión se vera algo asi:
```mongodb+srv://<user>:<password>@<host>/bdname?retryWrites=true&w=majority```
- Renombra el archivo ```.env.template``` por ```.env```
- Pega el string de conexión en la primera variable ```MONGO_URI```

## Servidor de desarrollo
- Clonar este repositorio
- Abre una terminal y dirigete a tu proyecto
- ``` npm i```
- Finalmente ejecuta el comando ```npm run dev```


## Testing Postman
- Importa el archivo ```postman_collection_bienesraices``` dentro de postman para empezar a probar los endpoints de este servicio web

## Tecnologías Utilizadas
- Servidor
  - express: 4.18.2
  - typescript: 4.9.4
  - multer: 1.4.54
  - jsonwebtoken: 9.0.0
- Base de datos
  - Mongo db

Happy coding!
