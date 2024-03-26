# API REST de usuarios para MongoDB

## Descripción

API creada con la finalidad de poder crear, editar y ver usuarios.  
### Modelos: 
- **user**: Posee los campos *email* (requerido), *color* (solo puede ser "red", "green", "blue"), *enabled* (booleano), *userInformation* (campo que relaciona user con userInformation).
- **userInformation**: Posee los campos *name* (requerido), *lastname* (requerido), *dni* (numero único) y *age*

### Principales rutas creadas:
- **users-get:** Devuelve un listado de todos los usuarios registrados en la BD. Tiene la opción de poder filtrar usuarios según si están habilitados o no. Se logra a través de una query.
- **users-post:** Se encarga de crear el usuario en la base de datos. Tiene la característica de que valida los datos antes de poder subir los datos a la BD. De no cumplir la validación se debe retornar status 400.
- **users-disable:** La ruta debe validar que exista el usuario y que esté habilitado (enabled=true), de no ser así debe retornar status 400. Si las validaciones son correctas, se debe marcar al usuario indicado como deshabilitado (enabled=false).
- **users-update:**: Ruta que actualiza cualquier dato del modelo "user"

### Ejemplo de datos para insertar, modificar o actualizar la BD
### users-post

```json 
// POST http://localhost:8080/api/users/
{
    "name": "John",
    "lastName": "Doe",
    "color": "blue",
    "email": "john.doe@gmail.com",
    "dni": "123456789",
    "age": 30
}
```
### users-get
// POST http://localhost:8080/api/users/?enabled=true

// POST http://localhost:8080/api/users/?enabled=false

### user-disable
// POST http://localhost:8080/api/users/:id/disable

### user-update
```json 
// PUT http://localhost:8080/users/:id
{
    "email": "nuevoemail@example.com",
    "color": "green"
}
```
## ¿Qué tal si usaramos una base de datos relacional?
**1.** Se debería instalar mediante npm el controlador de bases de datos, por ejemplo MySQL.
*npm install mysql*

**2.** Se debe modificar la configuración de conexión con la base de datos. 
```javascript
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'usuario',
    password: 'contraseña',
    database: 'nombre_basedatos'
});
```
**3.** Se debe crear las tablas *user* y *user-information*
```sql
CREATE TABLE user (
  UserId INT PRIMARY KEY,
  Email VARCHAR(50) required,
  Color VARCHAR(50),
  isEnabled BOOLEAN,
  userinformation INT,
  FOREIGN KEY (userinformation) REFERENCES userinformation(userinformationId)
);

CREATE TABLE userInformation (
  UserInformationId INT PRIMARY KEY,
  UserName VARCHAR(50) required,
  LastName VARCHAR(50) required,
  DNI INT unique required,
  age INT
);
```

**4.** Se deben modificar las consultas a la base de datos. Ejemplo de *users-get*, donde se obtienen los usuarios habilitados.
```javascript
connection.query('SELECT * FROM usuer WHERE isEnabled = TRUE')
```

## Dependencies

You need a MongoDB instance running.

You must install npm packages from package.json.

## Run

Use `start` script from package.json.

### Herramientas y tecnologías utilizadas
- Lenguaje backend utilizado: Node.js
- Framework web: Express
- Base de datos: MongoDB
- Editor de código fuente: Visual Studio Code
