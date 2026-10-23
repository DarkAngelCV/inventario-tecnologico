# Sistema de Inventario de Equipamiento Tecnológico

## 1. ¿De qué trata este proyecto?

Este proyecto consiste en desarrollar un sistema web para llevar el control de los equipos tecnológicos de una institución.

La idea es poder tener registrados los equipos en un solo lugar y facilitar su administración. Desde la aplicación se pueden agregar equipos nuevos, revisar los que ya están registrados, modificar sus datos y eliminarlos cuando sea necesario.

También agregué opciones para buscar equipos por su código, nombre, tipo o ubicación, y para filtrarlos según su estado.

## 2. Tecnologías que utilicé

Para desarrollar este proyecto trabajé con las siguientes tecnologías:

**Frontend:**
- Vue.js 3: para crear la interfaz que utiliza el usuario.
- Vite: para ejecutar el proyecto frontend.
- JavaScript: para programar las funcionalidades.
- Vue Router: para navegar entre las diferentes vistas.
- Axios: para comunicar el frontend con el backend.
- HTML y CSS: para construir y dar estilo a la página.

**Backend:**
- Node.js: entorno para ejecutar el servidor.
- NestJS: para desarrollar la API.
- TypeScript: lenguaje utilizado en el backend.
- TypeORM: para conectar el backend con MySQL.
- class-validator: para validar los datos ingresados.

**Base de datos:**
- MySQL 8.4: para almacenar la información de los equipos.

## 3. ¿Qué necesito para ejecutar el proyecto?

Antes de iniciar, es necesario tener instalado:

- Node.js y npm.
- MySQL 8.4.
- Visual Studio Code.

## 4. Configuración de la base de datos

Primero se debe crear la base de datos en MySQL utilizando el siguiente comando:

```sql
CREATE DATABASE inventario_tecnologico;
```

Después, dentro de la carpeta `backend`, se debe crear un archivo llamado `.env`, tomando como referencia el archivo `.env.example`.

El archivo debe contener los siguientes datos:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=TU_CLAVE_MYSQL
DB_DATABASE=inventario_tecnologico
```

En `DB_PASSWORD` se debe colocar la contraseña del usuario de MySQL que se esté utilizando.

El archivo `.env` no se debe subir a GitHub porque contiene información privada. Para eso se deja disponible el archivo `.env.example` como ejemplo de configuración.

## 5. ¿Cómo ejecutar el proyecto?

Para utilizar el sistema es necesario iniciar el backend y el frontend por separado, cada uno en su propia terminal.

**Iniciar el backend**

Primero se ingresa a la carpeta del backend:

```bash
cd backend
```

Luego se instalan las dependencias:

```bash
npm install
```

Finalmente, se inicia el servidor:

```bash
npm run start:dev
```

El backend queda funcionando en:

http://localhost:3000

**Iniciar el frontend**

En otra terminal se ingresa a la carpeta del frontend:

```bash
cd frontend
```

Se instalan las dependencias:

```bash
npm install
```

Y se inicia la aplicación:

```bash
npm run dev
```

La aplicación se puede abrir normalmente desde:

http://localhost:5173

## 6. ¿Qué se puede hacer en el sistema?

Las principales funciones que desarrollé son:

- Ver el listado de todos los equipos registrados.
- Agregar un equipo nuevo mediante un formulario.
- Editar la información de un equipo.
- Eliminar equipos con una confirmación antes de hacerlo.
- Buscar equipos por código de inventario, nombre, tipo o ubicación.
- Filtrar los equipos según su estado.
- Mostrar mensajes cuando los datos están cargando o cuando ocurre algún error.

Cada equipo tiene información como código de inventario, nombre, tipo, marca, modelo, ubicación, estado, fecha de adquisición y observaciones.

Los estados disponibles son:

- Disponible.
- En uso.
- Mantención.
- Baja.

## 7. Organización de las carpetas

El proyecto está separado en dos partes principales: `backend` y `frontend`.

La estructura principal es la siguiente:

```text
inventario-tecnologico/
│
├── backend/
│   └── src/
│       ├── equipos/
│       │   ├── dto/
│       │   ├── equipo.entity.ts
│       │   ├── equipos.controller.ts
│       │   ├── equipos.controller.spec.ts
│       │   ├── equipos.module.ts
│       │   ├── equipos.service.ts
│       │   └── equipos.service.spec.ts
│       ├── app.module.ts
│       └── main.ts
│
├── frontend/
│   └── src/
│       ├── services/
│       │   └── equiposService.js
│       ├── views/
│       │   ├── HomeView.vue
│       │   ├── CrearEquipoView.vue
│       │   └── EditarEquipoView.vue
│       ├── router/
│       └── App.vue
│
└── README.md
```

En el backend se encuentra la lógica para trabajar con los equipos y comunicarse con la base de datos.

En el frontend están las vistas que permiten al usuario interactuar con el sistema y el servicio que se encarga de comunicarse con la API.

Los archivos terminados en `.spec.ts` contienen las pruebas automatizadas del backend.

## 8. Endpoints utilizados

Para realizar las operaciones con los equipos desarrollé una API REST.

Los endpoints principales son:

| Método | Dirección | Función |
|---|---|---|
| GET | `/equipos` | Mostrar todos los equipos |
| GET | `/equipos/:id` | Buscar un equipo por su ID |
| POST | `/equipos` | Registrar un equipo nuevo |
| PATCH | `/equipos/:id` | Modificar un equipo |
| DELETE | `/equipos/:id` | Eliminar un equipo |

## 9. Validaciones y manejo de errores

También incorporé validaciones para evitar que se ingresen datos incorrectos.

Por ejemplo, algunos campos son obligatorios, el código de inventario y el nombre deben tener al menos tres caracteres y el estado debe corresponder a una de las opciones permitidas.

Además, el backend rechaza propiedades que no estén definidas en los DTO y devuelve un error 404 cuando se intenta buscar un equipo que no existe.

## 10. Pruebas realizadas

Durante el desarrollo fui probando las diferentes funciones para comprobar que el sistema trabajara correctamente.

Entre las pruebas realizadas están:

- Consultar todos los equipos.
- Buscar un equipo por su ID.
- Registrar equipos desde la API.
- Modificar equipos.
- Eliminar equipos.
- Comprobar las validaciones de los datos.
- Comprobar que se rechacen propiedades no permitidas.
- Consultar un ID que no existe y comprobar la respuesta 404.
- Probar las búsquedas y filtros desde la página.
- Realizar las operaciones de agregar, editar y eliminar desde el frontend.

**Pruebas automatizadas del backend**

También incorporé pruebas unitarias utilizando Vitest para comprobar el funcionamiento del servicio y del controlador de equipos.

Las pruebas verifican operaciones como:

- Obtener todos los equipos.
- Buscar un equipo por su ID.
- Comprobar el error cuando un equipo no existe.
- Crear un equipo.
- Actualizar un equipo.
- Eliminar un equipo.
- Comprobar que el controlador envíe correctamente las solicitudes al servicio.

Para ejecutar las pruebas, primero se debe ingresar a la carpeta `backend` y utilizar:

```bash
npm run test
```

Para revisar el código con el analizador de calidad se utiliza:

```bash
npm run lint
```

Durante la última ejecución se obtuvieron los siguientes resultados:

- 3 archivos de pruebas ejecutados.
- 12 pruebas aprobadas.
- 0 pruebas fallidas.
- 0 advertencias y 0 errores en la revisión de código.

Se mantienen cinco equipos registrados como datos de prueba para comprobar el funcionamiento del sistema.

## 11. Uso de inteligencia artificial

Durante la realización de este proyecto utilicé ChatGPT como apoyo para avanzar en el desarrollo y resolver algunas dudas que fueron apareciendo.

Lo utilicé principalmente para:

- Entender cómo configurar Vue.js y NestJS.
- Recibir orientación sobre cómo organizar los archivos del proyecto.
- Comprender cómo conectar el backend con MySQL utilizando TypeORM.
- Revisar código y entender para qué servían algunas funciones.
- Encontrar soluciones a errores que aparecieron durante el desarrollo.
- Orientarme en las pruebas de la API y del frontend.
- Comprender y preparar pruebas automatizadas para el backend.

El código se fue revisando, probando y adaptando durante el desarrollo. La idea es poder explicar cómo funciona cada parte del sistema y las decisiones tomadas para implementarlo.

## 12. Información del proyecto

**Asignatura:** Lenguaje de Programación Web II.

**Institución:** IPVG, Sede Chillán.

**Nombre del estudiante:** Cristian Vasquez.