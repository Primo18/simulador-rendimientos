# Simulador de Rendimientos API

Este proyecto es un backend desarrollado en **Node.js** utilizando **Express** y **TypeScript** para gestionar bancos, tasas de interés y simulaciones de rendimientos. Incluye documentación interactiva con Swagger, pruebas automatizadas y un sistema de seeds para datos iniciales.

---

## **Requisitos Previos**

- **Node.js**: Versión 22 o superior.
- **pnpm**: Gestor de paquetes (alternativa a npm).
- **MySQL**: Base de datos relacional.

---

## **Instrucciones de Instalación**

1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/tu-repo/simulador-rendimientos.git
   cd simulador-rendimientos
   ```

2. **Instalar Dependencias:**
   ```bash
   pnpm install
   ```

3. **Configurar el Entorno:**
   Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=simulador
   DB_USERNAME=root
   DB_PASSWORD=tu-contraseña
   JWT_SECRET=clave-secreta
   PORT=3000
   ```

4. **Inicializar la Base de Datos:**
   Ejecuta el script de seeds para poblar la base de datos con datos iniciales:
   ```bash
   pnpm seed
   ```

5. **Iniciar el Servidor:**
   ```bash
   pnpm start
   ```
   El servidor se iniciará en: `http://localhost:3000`

---

## **Estructura del Proyecto**

```plaintext
src/
├── controllers/      # Controladores de rutas
├── database/         # Configuración de la base de datos
├── models/           # Definición de modelos con Sequelize
├── routes/           # Definición de rutas de la API
├── services/         # Lógica del negocio
├── tests/            # Servidor de prueba
├── seeds/            # Script para poblar datos iniciales
├── utils/            # Utilidades (helpers)
├── config/           # Configuraciones (Swagger, etc.)
└── app.ts            # Punto de entrada principal
```

- **`controllers`**: Manejan las peticiones HTTP y delegan lógica a los servicios.
- **`models`**: Define la estructura de las tablas y relaciones con Sequelize.
- **`services`**: Contiene la lógica del negocio.
- **`routes`**: Define las rutas de la API.
- **`tests`**: Archivos de prueba para endpoints y servicios.
- **`seeds`**: Crea datos iniciales para la base de datos.

---

## **Documentación de la API con Swagger**

La documentación interactiva de la API está disponible en:

```
http://localhost:3000/api-docs
```

### **Rutas Principales**

#### **Usuarios**
- **POST /api/users/login**: Iniciar sesión y obtener un token JWT.

#### **Bancos**
- **GET /api/banks**: Obtener todos los bancos.
- **POST /api/banks**: Crear un nuevo banco.
- **GET /api/banks/{id}**: Obtener un banco por ID.
- **PUT /api/banks/{id}**: Actualizar un banco por ID.
- **DELETE /api/banks/{id}**: Eliminar un banco por ID.

#### **Tasas de Interés**
- **GET /api/interest-rates**: Obtener todas las tasas de interés.
- **POST /api/interest-rates**: Crear una nueva tasa de interés.

#### **Simulación**
- **POST /api/simulation/simulate**: Simular rendimientos financieros.

#### **Logs**
- **GET /api/logs**: Ver los logs de acciones (protegido para `ADMIN`).

---

## **Modelo MER de la Base de Datos**

El modelo MER de la base de datos se muestra a continuación:

```mermaid
erDiagram
    Users {
        INTEGER id PK
        STRING username UNIQUE
        STRING password
        ENUM role "USER, ADMIN"
        TIMESTAMP createdAt
        TIMESTAMP updatedAt
    }

    Logs {
        INTEGER id PK
        STRING action
        INTEGER userId FK
        TEXT previousData
        TEXT newData
        TIMESTAMP createdAt
        TIMESTAMP updatedAt
    }

    Banks {
        INTEGER id PK
        STRING name
        STRING address
        STRING contact
        TIMESTAMP createdAt
        TIMESTAMP updatedAt
    }

    InterestRates {
        INTEGER id PK
        INTEGER bankId FK
        FLOAT annualPercentage
        DATE lastModified
        TIMESTAMP createdAt
        TIMESTAMP updatedAt
    }

    Users ||--o{ Logs : "has many"
    Banks ||--o{ InterestRates : "has many"
```

---

## **Testing**

Las pruebas se realizan con **Jest** y **Supertest**.

### **Ejecutar las Pruebas**

1. Ejecuta las pruebas:
   ```bash
   pnpm test
   ```

2. Verifica la cobertura de código:
   ```bash
   pnpm test --coverage
   ```

### **Pruebas Incluidas**

- **Usuarios**: Inicio de sesión y validación de credenciales.
- **Bancos**: CRUD completo (creación, lectura, actualización y eliminación).
- **Tasas de Interés**: Creación y obtención.
- **Simulaciones**: Pruebas de cálculo de rendimientos.
- **Autenticación**: Validación de rutas protegidas.

---

## **Seed de Datos Iniciales**

El proyecto incluye datos iniciales:

### **Usuarios**
- `admin` (rol: `ADMIN`, contraseña: `admin123`).
- `user` (rol: `USER`, contraseña: `user123`).

### **Bancos**
- Banco de Chile.
- Banco Estado.
- Santander Chile.
- Banco BCI.
- Scotiabank Chile.

### **Tasas de Interés**
- Asociadas a los bancos anteriores.

Ejecuta el seed para poblar estos datos:
```bash
pnpm tsx src/seeds/seed.ts
```

---

## **Soporte y Contribución**

Si encuentras problemas o deseas contribuir:

1. Crea un issue en el repositorio.
2. Envía un pull request con mejoras o correcciones.

¡Gracias por usar el Simulador de Rendimientos API! 🚀

