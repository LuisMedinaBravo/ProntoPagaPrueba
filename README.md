# ProntoPaga

Aplicacion web para autenticacion de usuarios y consulta de score financiero por rut.

## Tecnologias

- React y TypeScript
- Vite
- Express
- JSON Web Token (JWT)
- Axios
- Vitest y Testing Library

## Requisitos

- Node.js
- npm

## Instalacion

Desde la raiz del proyecto, instalar las dependencias:

```bash
npm install
```

## Configuracion del backend

Crea un archivo `.env` en la raiz del proyecto usando `.env.example` como referencia:

```dotenv
PORT=3000
JWT_SECRET=tu-jwt-secreto
JWT_EXPIRES_IN=1h
```

## Configuracion del frontend

El frontend utiliza la variable `VITE_API_URL` para conectarse con el backend. Crea `src/frontend/.env` con:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

## Ejecucion local

El proyecto se ejecuta en `localhost` con dos servidores. Abre dos terminales desde la raiz del proyecto.

### Backend

El backend se ejecuta en el puerto `3000`:

```bash
npm run dev:backend
```

URL del backend: <http://localhost:3000>

Endpoint de verificación del backend:

```bash
curl http://localhost:3000/health
```

### Frontend

El frontend se ejecuta con Vite en el puerto `5173`:

```bash
npm run dev
```

URL de la aplicacion: <http://localhost:5173>

## Usuarios de prueba

### Administrador

- Email: `admin@prontopaga.com`
- Password: `admin12345`
- RUT: `12.345.678-9`

El administrador puede consultar cualquier rut.

### Usuario

- Email: `user@prontopaga.com`
- Password: `user12345`
- RUT: `9.999.999-9`

El usuario puede consultar unicamente su propio rut.

## Pruebas

Ejecuta todas las pruebas de backend y frontend:

```bash
npm test
```

Las pruebas cubren autenticacion, generacion de JWT, calculo deterministico del score, rutas protegidas y formulario de login.