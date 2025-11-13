# Web-Ensolvers

Sistema de Notas
________________________________________
Requisitos del Sistema
Herramientas Necesarias
Herramienta	Versión Requerida	Propósito
Node.js	18.17.0 o superior	Entorno de ejecución JavaScript
npm	9.6.7 o superior	Gestor de paquetes de Node.js
SQL Server	2019 o superior	Sistema de base de datos
Git	2.30 o superior	Control de versiones
Sistemas Operativos Soportados
•	 Linux (Ubuntu 20.04+, Debian 11+)
•	 macOS (11.0 Big Sur o superior)
•	Windows 10/11 (con WSL2 para scripts Bash)
Verificar Versiones Instaladas
node --version   # Debe mostrar v18.17.0 o superior
npm --version    # Debe mostrar 9.6.7 o superior
________________________________________
Tecnologías Utilizadas
Backend
•	Node.js (v18.17.0+)
•	Express (v4.18.2) - Framework web
•	Sequelize (v6.35.0) - ORM para SQL Server
•	mssql (v10.0.1) - Driver de SQL Server
•	tedious (v16.6.1) - Driver TDS para SQL Server
•	bcryptjs (v2.4.3) - Encriptación de contraseñas
•	dotenv (v16.3.1) - Variables de entorno
•	cors (v2.8.5) - CORS middleware
Frontend
•	React (v18.2.0)
•	React DOM (v18.2.0)
•	React Scripts (v5.0.1)
Base de Datos
•	Microsoft SQL Server (2019+)
•	Puerto por defecto: 1433
________________________________________
Instalación
1. Clonar el Repositorio
git clone <url-del-repositorio>
cd notes-app
2. Configurar SQL Server
Asegúrate de que SQL Server esté instalado y corriendo:
# En Linux con systemd
sudo systemctl status mssql-server

# O verifica la conexión
sqlcmd -S localhost -U sa -P 'tu_contraseña'
3. Crear la Base de Datos
CREATE DATABASE notes_app;
GO
4. Configurar Variables de Entorno
Edita backend/.env con tus credenciales:
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASS=tu_contraseña_aqui
DB_NAME=notes_app
PORT=3000
5. Instalar Dependencias
# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
________________________________________
Configuración
Variables de Entorno
Backend (backend/.env)
# Configuración de la Base de Datos
DB_HOST=localhost          # Host del servidor SQL Server
DB_PORT=1433              # Puerto de SQL Server
DB_USER=sa                # Usuario de SQL Server
DB_PASS=tu_contraseña     # Contraseña de SQL Server
DB_NAME=notes_app         # Nombre de la base de datos

# Configuración del Servidor
PORT=3000                 # Puerto del backend
Frontend
El frontend se conecta por defecto a http://localhost:3000/api. Si cambias el puerto del backend, actualiza frontend/src/services/api.js:
const API_URL = 'http://localhost:3000/api';
________________________________________
Ejecución
Opción 1: Inicio Automático (Linux/macOS)
Ejecuta el script de inicio automatizado:
chmod +x start.sh
./start.sh
Este script:
•	Verifica que Node.js y npm estén instalados
•	Instala dependencias si es necesario
•	Configura la base de datos
•	Crea las tablas automáticamente
•	Inicia backend y frontend simultáneamente
Opción 2: Inicio Manual
Iniciar Backend
cd backend
npm start
El backend estará disponible en http://localhost:3000
Iniciar Frontend (en otra terminal)
cd frontend
npm start
El frontend estará disponible en http://localhost:3001
Opción 3: Modo Desarrollo
# Backend con nodemon (reinicio automático)
cd backend
npm run dev

# Frontend (en otra terminal)
cd frontend
npm start
________________________________________

Credenciales por Defecto
Al iniciar la aplicación por primera vez, se crea automáticamente un usuario administrador:
•	Usuario: admin
•	Contraseña: admin123
________________________________________

Muy Importante en Linux/macOS:
•	Dale permisos de ejecución al script
chmod +x start.sh
•	Ejecuta la aplicación
./start.sh
________________________________________

•	Comandos alternativos desde la raíz:


•	# Instalar todas las dependencias
npm run install:all
•	# Iniciar solo backend
npm run backend
•	# Iniciar solo frontend  
npm run frontend


