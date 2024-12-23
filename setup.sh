#!/bin/bash

echo "Setting up the Simulador de Rendimientos Backend..."

# Step 1: Verificar e instalar pnpm si no está instalado
if ! command -v pnpm &> /dev/null
then
    echo "pnpm no encontrado. Instalando..."
    npm install -g pnpm
else
    echo "pnpm ya está instalado."
fi

# Step 2: Instalar dependencias
echo "Instalando dependencias..."
pnpm install

# Step 3: Crear archivo .env
if [ ! -f .env ]; then
    echo "Creando archivo .env..."
    cat <<EOT > .env
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_NAME=simulador

PORT=3000
JWT_SECRET=secret
JWT_EXPIRES_IN=3h
EOT
    echo "Archivo .env creado."
else
    echo "El archivo .env ya existe. Omitiendo creación."
fi

# Step 4: Crear base de datos MySQL si no existe
echo "Creando base de datos MySQL..."
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS simulador;"
if [ $? -ne 0 ]; then
    echo "Error al crear la base de datos. Por favor verifica tus credenciales de MySQL."
    exit 1
fi

# Step 5: Sincronizar modelos con la base de datos
echo "Sincronizando modelos con la base de datos..."
pnpm tsx src/utils/syncModels.js
if [ $? -ne 0 ]; then
    echo "Error al sincronizar modelos. Verifica tu configuración de Sequelize."
    exit 1
fi

# Step 6: Poblar base de datos con datos iniciales
echo "Ejecutando seeds para poblar la base de datos..."
pnpm tsx src/seeds/seed.ts
if [ $? -ne 0 ]; then
    echo "Error al ejecutar seeds. Verifica tus scripts de seeds."
    exit 1
fi

# Step 7: Compilar el proyecto
echo "Compilando el proyecto..."
pnpm build
if [ $? -ne 0 ]; then
    echo "Error al compilar el proyecto. Verifica tu código TypeScript."
    exit 1
fi

# Step 8: Iniciar el servidor
echo "Iniciando el servidor..."
pnpm start
if [ $? -ne 0 ]; then
    echo "Error al iniciar el servidor. Verifica tu configuración."
    exit 1
fi

echo "¡Configuración completa! El backend está corriendo en http://localhost:3000"
