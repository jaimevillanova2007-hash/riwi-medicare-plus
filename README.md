# riwi-medicare-plus
# RiwiMediCare Plus API

API REST desarrollada con **Node.js, TypeScript, Express, Sequelize y PostgreSQL** para gestionar clínicas, usuarios, medicamentos, almacenes, inventario y solicitudes de abastecimiento.

El proyecto implementa autenticación mediante **JWT**, control de acceso por roles, contraseñas protegidas mediante **bcrypt**, eliminación lógica, validaciones, relaciones entre entidades, documentación Swagger, pruebas automatizadas y configuración mediante Docker.

---

##  Tabla de contenidos

* [Descripción](#-descripción)
* [Objetivo](#-objetivo)
* [Tecnologías](#-tecnologías)
* [Arquitectura](#-arquitectura)
* [Estructura del proyecto](#-estructura-del-proyecto)
* [Requisitos previos](#-requisitos-previos)
* [Instalación](#-instalación)
* [Variables de entorno](#-variables-de-entorno)
* [Base de datos](#-base-de-datos)
* [Ejecución](#-ejecución)
* [Autenticación](#-autenticación)
* [Roles y permisos](#-roles-y-permisos)
* [Entidades](#-entidades)
* [Endpoints](#-endpoints)
* [Inventario](#-inventario)
* [Solicitudes](#-solicitudes)
* [Seeder](#-seeder)
* [Swagger](#-swagger)
* [Pruebas](#-pruebas)
* [Docker](#-docker)
* [Git y GitHub](#-git-y-github)
* [Códigos HTTP](#-códigos-http)
* [Seguridad](#-seguridad)
* [Backup](#-backup)
* [Checklist](#-checklist)

---

#  Descripción

**RiwiMediCare Plus** es una API REST orientada a la gestión de abastecimiento de medicamentos para clínicas.

La aplicación permite administrar:

* Usuarios.
* Clínicas.
* Almacenes.
* Medicamentos.
* Inventario.
* Solicitudes de medicamentos.
* Estados de las solicitudes.
* Autenticación y autorización.

La API está construida siguiendo una arquitectura organizada por capas para facilitar el mantenimiento, escalabilidad y reutilización del código.

---

#  Objetivo

El objetivo principal es desarrollar un backend capaz de gestionar el proceso de abastecimiento de medicamentos.

El flujo principal es:

```text
Usuario
   ↓
Autenticación
   ↓
JWT
   ↓
Autorización por rol
   ↓
Clínica
   ↓
Solicitud de medicamento
   ↓
Validación de inventario
   ↓
Actualización del stock
   ↓
Seguimiento de la solicitud
```

---

# Tecnologías

| Tecnología      | Uso                      |
| --------------- | ------------------------ |
| Node.js         | Entorno de ejecución     |
| TypeScript      | Lenguaje de programación |
| Express         | Framework para API REST  |
| Sequelize       | ORM                      |
| PostgreSQL      | Base de datos relacional |
| bcrypt          | Hash de contraseñas      |
| JSON Web Token  | Autenticación            |
| Multer          | Carga de archivos        |
| Swagger/OpenAPI | Documentación de API     |
| Jest            | Pruebas automatizadas    |
| Supertest       | Pruebas HTTP             |
| Docker          | Contenedores             |
| Git             | Control de versiones     |
| GitHub          | Repositorio remoto       |

---

#  Arquitectura

El proyecto utiliza una separación por responsabilidades:

```text
src/
│
├── config/
│   └── Configuración de base de datos y Swagger
│
├── controllers/
│   └── Manejo de solicitudes HTTP
│
├── middlewares/
│   └── Autenticación, roles, validaciones y errores
│
├── models/
│   └── Modelos Sequelize
│
├── routes/
│   └── Rutas de la API
│
├── services/
│   └── Lógica de negocio
│
├── types/
│   └── Tipos e interfaces TypeScript
│
├── utils/
│   └── Funciones auxiliares
│
├── app.ts
│   └── Configuración de Express
│
└── server.ts
    └── Inicio del servidor
```

La lógica principal se encuentra en los servicios para evitar sobrecargar los controladores.

---

#  Estructura del proyecto

```text
riwi-medicare-plus/
│
├── data/
│   ├── clinics.json
│   ├── inventory.json
│   ├── medicines.json
│   ├── users.json
│   └── warehouses.json
│
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── swagger.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── clinic.controller.ts
│   │   ├── inventory.controller.ts
│   │   ├── medicine.controller.ts
│   │   ├── request.controller.ts
│   │   ├── seed.controller.ts
│   │   ├── user.controller.ts
│   │   └── warehouse.controller.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── upload.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── models/
│   │   ├── Clinic.ts
│   │   ├── Inventory.ts
│   │   ├── Medicine.ts
│   │   ├── Request.ts
│   │   ├── User.ts
│   │   ├── Warehouse.ts
│   │   └── index.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── clinic.routes.ts
│   │   ├── inventory.routes.ts
│   │   ├── medicine.routes.ts
│   │   ├── request.routes.ts
│   │   ├── seed.routes.ts
│   │   ├── user.routes.ts
│   │   └── warehouse.routes.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── clinic.service.ts
│   │   ├── inventory.service.ts
│   │   ├── medicine.service.ts
│   │   ├── request.service.ts
│   │   ├── seed.service.ts
│   │   ├── user.service.ts
│   │   └── warehouse.service.ts
│   │
│   ├── types/
│   │   ├── auth.types.ts
│   │   ├── express.d.ts
│   │   └── request.types.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── password.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── tests/
│   ├── auth.test.ts
│   └── request.test.ts
│
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── swagger.json
└── tsconfig.json
```

---

#  Requisitos previos

Antes de ejecutar el proyecto se necesita tener instalado:

* Node.js
* npm
* Git
* Docker
* Docker Compose
* PostgreSQL o el contenedor PostgreSQL incluido en Docker.

Para comprobar Node.js:

```bash
node --version
```

Para comprobar npm:

```bash
npm --version
```

Para comprobar Docker:

```bash
docker --version
```

---

#  Instalación

Clonar el repositorio:

```bash
git clone https://github.com/jaimevillanova2007-hash/riwi-medicare-plus.git
```

Entrar al proyecto:

```bash
cd riwi-medicare-plus
```

Instalar dependencias:

```bash
npm install
```

---

#  Variables de entorno

Crear un archivo:

```text
.env
```

con las siguientes variables:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5434
DB_NAME=riwi_medicare
DB_USER=admin
DB_PASSWORD=admin123

JWT_SECRET=riwi_medicare_super_secret_2026
JWT_EXPIRES_IN=2h
```

El archivo `.env` no debe subirse a GitHub.

Para compartir la estructura de configuración se utiliza:

```text
.env.example
```

---

#  Base de datos

La aplicación utiliza:

```text
PostgreSQL
```

Base de datos:

```text
riwi_medicare
```

Usuario:

```text
admin
```

Puerto:

```text
5434
```

Las tablas principales son:

```text
users
clinics
warehouses
medicines
inventory
requests
```

Las tablas se crean mediante Sequelize al iniciar la aplicación.

---

# ▶ Ejecución

Modo desarrollo:

```bash
npm run dev
```

Compilar TypeScript:

```bash
npm run build
```

Ejecutar versión compilada:

```bash
npm start
```

La API estará disponible en:

```text
http://localhost:3000
```

Para comprobar que está funcionando:

```text
GET /
```

Respuesta esperada:

```json
{
  "message": "RiwiMediCare Plus API",
  "status": "running"
}
```

---

#  Autenticación

La API utiliza **JWT (JSON Web Token)**.

Primero se registra un usuario:

```http
POST /api/auth/register
```

Ejemplo:

```json
{
  "name": "Administrador",
  "email": "admin@example.com",
  "password": "123456",
  "role": "ADMIN"
}
```

Después se realiza el login:

```http
POST /api/auth/login
```

Ejemplo:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

La API devuelve un token:

```json
{
  "user": {
    "id": 1,
    "name": "Administrador",
    "email": "admin@example.com",
    "role": "ADMIN"
  },
  "token": "JWT_TOKEN"
}
```

Para acceder a rutas protegidas se debe enviar:

```http
Authorization: Bearer JWT_TOKEN
```

---

# 👥 Roles y permisos

El sistema utiliza dos roles principales:

```text
ADMIN
GESTOR
```

## ADMIN

Tiene acceso administrativo a los recursos del sistema.

Puede:

* Gestionar usuarios.
* Gestionar clínicas.
* Gestionar almacenes.
* Gestionar medicamentos.
* Gestionar inventario.
* Gestionar solicitudes.

## GESTOR

Puede realizar las operaciones permitidas para la gestión operativa del sistema, de acuerdo con las reglas de autorización implementadas en las rutas.

El control se realiza mediante:

```text
JWT
  ↓
auth.middleware
  ↓
role.middleware
  ↓
Endpoint
```

---

#  Entidades

## User

Representa a los usuarios del sistema.

Campos principales:

```text
id
name
email
password
role
status
```

La contraseña nunca debe almacenarse en texto plano.

Se utiliza:

```text
bcrypt
```

---

## Clinic

Representa una clínica.

Campos:

```text
id
name
nit
responsibleName
responsibleEmail
status
```

El NIT es único.

---

## Warehouse

Representa un almacén.

Campos:

```text
id
name
location
status
```

---

## Medicine

Representa un medicamento.

Campos:

```text
id
name
description
status
```

---

## Inventory

Relaciona un medicamento con un almacén.

Campos:

```text
id
warehouseId
medicineId
quantity
status
```

La combinación:

```text
warehouseId + medicineId
```

es única.

---

## Request

Representa una solicitud de medicamentos realizada por una clínica.

Campos:

```text
id
clinicId
medicineId
warehouseId
quantity
status
createdBy
active
```

Estados disponibles:

```text
PENDING
APPROVED
REJECTED
DELIVERED
CANCELLED
```

---

#  Relaciones

Las principales relaciones son:

```text
User
 │
 └──< Request

Clinic
 │
 └──< Request

Medicine
 │
 ├──< Request
 │
 └──< Inventory

Warehouse
 │
 ├──< Request
 │
 └──< Inventory
```

La tabla `inventory` funciona como relación entre:

```text
Warehouse
     ↕
Inventory
     ↕
Medicine
```

---

#  Endpoints

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

---

## Users

```text
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

---

## Clinics

```text
GET    /api/clinics
GET    /api/clinics/:id
POST   /api/clinics
PUT    /api/clinics/:id
DELETE /api/clinics/:id
```

---

## Warehouses

```text
GET    /api/warehouses
GET    /api/warehouses/:id
POST   /api/warehouses
PUT    /api/warehouses/:id
DELETE /api/warehouses/:id
```

---

## Medicines

```text
GET    /api/medicines
GET    /api/medicines/:id
POST   /api/medicines
PUT    /api/medicines/:id
DELETE /api/medicines/:id
```

---

## Inventory

```text
GET    /api/inventory
GET    /api/inventory/:id
POST   /api/inventory
PUT    /api/inventory/:id
DELETE /api/inventory/:id
```

---

## Requests

```text
GET    /api/requests
GET    /api/requests/:id
POST   /api/requests
PUT    /api/requests/:id
DELETE /api/requests/:id
```

---

#  Inventario

El inventario permite conocer la cantidad disponible de cada medicamento en cada almacén.

Ejemplo:

```text
Almacén Norte
----------------
Paracetamol     100
Ibuprofeno       50

Almacén Sur
----------------
Paracetamol      30
Ibuprofeno       90
```

Antes de crear una solicitud se valida:

```text
¿Existe el medicamento?
        ↓
¿Existe el almacén?
        ↓
¿Existe el inventario?
        ↓
¿Hay cantidad suficiente?
        ↓
Sí → Crear solicitud
No → Rechazar operación
```

Esto evita solicitar cantidades superiores al inventario disponible.

---

# Solicitudes

Una solicitud contiene:

```text
Clínica
Medicamento
Almacén
Cantidad
Usuario creador
Estado
```

Ejemplo:

```json
{
  "clinicId": 1,
  "medicineId": 2,
  "warehouseId": 1,
  "quantity": 20
}
```

El sistema valida la disponibilidad antes de procesar la solicitud.

---

#  Eliminación lógica

Los recursos que utilizan eliminación lógica no son eliminados físicamente de la base de datos.

En lugar de:

```sql
DELETE FROM clinics;
```

se modifica su estado:

```text
status = false
```

Esto permite conservar el historial de información.

---

#  Seeder

El proyecto contiene archivos JSON dentro de:

```text
data/
```

Ejemplo:

```text
data/users.json
data/clinics.json
data/warehouses.json
data/medicines.json
data/inventory.json
```

Estos archivos permiten cargar información inicial en la base de datos.

El proyecto también incluye middleware para manejar la carga de archivos mediante:

```text
Multer
```

---

# Swagger

La API incluye documentación mediante:

```text
OpenAPI / Swagger
```

La documentación permite consultar los endpoints, parámetros, respuestas y esquemas de la API.

Archivo principal:

```text
swagger.json
```

La configuración se encuentra en:

```text
src/config/swagger.ts
```

---

#  Pruebas

El proyecto utiliza:

```text
Jest
Supertest
```

Las pruebas están ubicadas en:

```text
tests/
```

Actualmente se incluyen pruebas para:

```text
auth.test.ts
request.test.ts
```

Ejecutar pruebas:

```bash
npm test
```

Ejecutar pruebas con cobertura:

```bash
npm run test:coverage
```

---

#  Docker

El proyecto incluye:

```text
Dockerfile
docker-compose.yml
```

Docker permite ejecutar los servicios necesarios de forma aislada.

Para iniciar los contenedores:

```bash
docker compose up -d
```

Para comprobar los contenedores:

```bash
docker ps
```

Para detenerlos:

```bash
docker compose down
```

---

# 🔄 Git y GitHub

El proyecto utiliza Git para control de versiones.

Repositorio:

```text
https://github.com/jaimevillanova2007-hash/riwi-medicare-plus
```

Crear cambios:

```bash
git add .
```

Crear commit:

```bash
git commit -m "feat: description of change"
```

Subir cambios:

```bash
git push
```

Actualizar el proyecto:

```bash
git pull
```

---

#  Convención de commits

Se recomienda utilizar Conventional Commits.

Ejemplos:

```text
feat: add medicine endpoint
```

```text
fix: correct inventory validation
```

```text
docs: update README
```

```text
test: add request tests
```

```text
refactor: improve request service
```

---

#  Códigos HTTP

La API utiliza códigos HTTP apropiados.

| Código | Significado           |
| ------ | --------------------- |
| 200    | Operación exitosa     |
| 201    | Recurso creado        |
| 400    | Solicitud inválida    |
| 401    | No autenticado        |
| 403    | Sin permisos          |
| 404    | Recurso no encontrado |
| 409    | Conflicto             |
| 500    | Error interno         |

---

#  Seguridad

El proyecto implementa diferentes mecanismos de seguridad:

### Contraseñas

Las contraseñas se almacenan mediante hash:

```text
bcrypt
```

Nunca se deben guardar contraseñas en texto plano.

### JWT

La autenticación utiliza:

```text
JSON Web Token
```

### Variables sensibles

Las credenciales se almacenan en:

```text
.env
```

Este archivo está excluido de Git mediante:

```text
.gitignore
```

### Roles

Los endpoints protegidos utilizan middleware de autorización.

---

#  Backup de PostgreSQL

Para realizar un backup de la base de datos se puede utilizar:

```bash
pg_dump -h localhost -p 5434 -U admin -d riwi_medicare > backup.sql
```

Para restaurar:

```bash
psql -h localhost -p 5434 -U admin -d riwi_medicare < backup.sql
```

---

#  Checklist del proyecto

## Backend

* [x] Node.js
* [x] TypeScript
* [x] Express
* [x] Sequelize
* [x] PostgreSQL
* [x] Arquitectura por capas

## Base de datos

* [x] Users
* [x] Clinics
* [x] Warehouses
* [x] Medicines
* [x] Inventory
* [x] Requests
* [x] Relaciones entre entidades

## Seguridad

* [x] bcrypt
* [x] JWT
* [x] Middleware de autenticación
* [x] Middleware de roles
* [x] Variables de entorno
* [x] `.env` excluido de Git

## API

* [x] CRUD de usuarios
* [x] CRUD de clínicas
* [x] CRUD de almacenes
* [x] CRUD de medicamentos
* [x] CRUD de inventario
* [x] CRUD de solicitudes
* [x] Validaciones
* [x] Manejo de errores
* [x] Eliminación lógica

## Documentación

* [x] README
* [x] Swagger/OpenAPI
* [x] Ejemplos de endpoints

## Calidad

* [x] TypeScript
* [x] Jest
* [x] Supertest
* [x] Pruebas automatizadas

## DevOps

* [x] Dockerfile
* [x] Docker Compose
* [x] Git
* [x] GitHub
* [x] `.gitignore`

---

#  Autor

**Jaime Villanova**

Proyecto desarrollado durante la formación de desarrollo de software en Riwi.

---

#  Licencia

Este proyecto fue desarrollado con fines académicos y de aprendizaje.
