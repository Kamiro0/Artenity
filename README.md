# Artenity

Artenity es una red social para artistas. Permite crear publicaciones con imágenes o videos, gestionar perfiles, seguir usuarios, buscar contenido, enviar mensajes, recibir advertencias y reportar contenido.

## Tecnologías

- Backend: Python, FastAPI, SQLAlchemy y Uvicorn
- Base de datos: MariaDB/MySQL
- Frontend: React 18, TypeScript y Axios
- Pruebas: pytest
- Servidor web local recomendado: XAMPP

## Puertos locales

| Servicio | Dirección |
|---|---|
| Frontend React | http://localhost:3000 |
| Backend FastAPI | http://localhost:8000 |
| Documentación Swagger | http://localhost:8000/docs |
| Documentación ReDoc | http://localhost:8000/redoc |
| phpMyAdmin | http://localhost/phpmyadmin |

## Requisitos

Instala primero:

- Git
- Python estable compatible con las dependencias actuales
- Node.js 18 o superior
- XAMPP con Apache y MariaDB/MySQL

Este proyecto usa Windows con Git Bash en los ejemplos. Ejecuta siempre los comandos desde la raíz del repositorio:

```bash
cd /c/Users/camil/Artenity
```

> Importante: el entorno actual tiene Python 3.15.2. Python 3.15 es nuevo y varias librerías fijadas en `backend/requirements.txt` aún pueden carecer de ruedas compatibles. Usa Python 3.13 o 3.14, que tienen mejor compatibilidad con el ecosistema actual del proyecto.

## 1. Instalar Python actualizado

Comprueba las versiones disponibles:

```bash
python --version
py -0p
```

Instala Python 3.14 desde la web oficial o con winget:

```powershell
winget install --id Python.Python.3.14 -e
```

Cierra todas las terminales después de instalarlo y abre una terminal Git Bash nueva.

Para comprobar el intérprete:

```bash
py -3.14 --version
```

## 2. Configurar el backend

### 2.1 Crear el entorno virtual

Desde la raíz del proyecto:

```bash
rm -rf backend/venv
py install 3.14
py -3.14 -m venv backend/venv
source backend/venv/Scripts/activate
```

Al activarlo, el prompt debe mostrar `(venv)`.

Verifica que está usando el Python del entorno:

```bash
which python
python --version
python -m pip --version
```

La ruta mostrada por `which python` debe contener `backend/venv/Scripts/python.exe`.

### 2.2 Actualizar pip y instalar dependencias

```bash
python -m pip install --upgrade pip setuptools wheel
python -m pip install -r backend/requirements.txt
```

No uses `pip` sin `python -m pip`; esto garantiza que la instalación se haga dentro del entorno virtual.

Si una versión no tiene rueda compatible, registra el error completo antes de cambiar de versión. No instales paquetes al azar ni uses `--ignore-requires-python`.

### 2.3 Configurar variables de entorno

Crea `backend/.env` a partir del ejemplo:

```bash
cp backend/.env.example backend/.env
```

Contenido inicial para desarrollo local:

```env
DATABASE_URL=mysql+pymysql://root:@localhost:3306/artenity
SECRET_KEY=cambia-esta-clave-por-una-secreta-de-al-menos-32-caracteres
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000

MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM=
MAIL_FROM_NAME=Artiverse
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
MAIL_STARTTLS=true
MAIL_SSL_TLS=false
USE_CREDENTIALS=true
VALIDATE_CERTS=true
```

Si MariaDB tiene una contraseña para `root`, reemplázala:

```env
DATABASE_URL=mysql+pymysql://root:TU_PASSWORD@localhost:3306/artenity
```

No subas `backend/.env` a Git.

## 3. Configurar MariaDB/MySQL

### 3.1 Iniciar MariaDB

Abre XAMPP Control Panel:

1. Inicia **Apache**.
2. Inicia **MySQL**.
3. Verifica que MySQL tenga el estado verde.

### 3.2 Crear la base de datos

Desde Git Bash puedes usar el cliente incluido en XAMPP:

```bash
"C:/xampp/mysql/bin/mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS artenity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Si tu usuario tiene contraseña:

```bash
"C:/xampp/mysql/bin/mysql.exe" -u root -p -e "CREATE DATABASE IF NOT EXISTS artenity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 3.3 Importar el dump

El repositorio incluye `backend/artenity.sql`.

```bash
"C:/xampp/mysql/bin/mysql.exe" -u root artenity < backend/artenity.sql
```

Con contraseña:

```bash
"C:/xampp/mysql/bin/mysql.exe" -u root -p artenity < backend/artenity.sql
```

También puedes crear/importar la base desde http://localhost/phpmyadmin.

### 3.4 Verificar la conexión

```bash
"C:/xampp/mysql/bin/mysql.exe" -u root -e "USE artenity; SHOW TABLES;"
```

Debe mostrar las tablas del proyecto.

## 4. Ejecutar el backend

Activa el entorno y ejecuta Uvicorn desde la raíz del proyecto:

```bash
source backend/venv/Scripts/activate
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Verifica:

- API: http://127.0.0.1:8000
- Swagger: http://127.0.0.1:8000/docs
- Archivos estáticos: http://127.0.0.1:8000/static/

Mantén esta terminal abierta. Una recarga automática reinicia el servidor cuando cambia el código Python.

## 5. Configurar y ejecutar el frontend

Abre otra terminal Git Bash en la raíz del proyecto.

Instala Node.js actualizado y las dependencias:

```bash
cd frontend
npm install
npm start
```

El frontend debe abrirse en http://localhost:3000.

Si necesitas volver a la raíz:

```bash
cd ..
```

En desarrollo, el frontend usa `http://localhost:8000` por defecto. Para producción, configura `REACT_APP_API_URL` con la URL pública del backend, sin una barra final. En Vercel, agrega esa variable de entorno y vuelve a desplegar; su valor es público y no debe contener credenciales.

Las llamadas a la API y las URLs de archivos usan esa configuración compartida en `frontend/src/services/api.ts`.

### Desplegar el frontend en Vercel

Configura la carpeta `frontend` como raíz del proyecto y usa `npm run build` como comando de compilación. El script de build permite que las advertencias actuales de ESLint no cancelen la compilación en CI; las advertencias siguen visibles y deben corregirse.

Vercel solo despliega el frontend. Para que la aplicación funcione en producción, primero debes desplegar el backend y cambiar las URLs `localhost:8000` por la URL pública de la API. La base de datos MySQL/MariaDB también debe estar alojada por separado.

### Backend en Railway con TiDB Cloud

La base de datos puede permanecer en TiDB Cloud; no es necesario crear otra base MySQL en Railway. El `Dockerfile` de la raíz prepara FastAPI para Railway e incluye el certificado CA usado para la conexión TLS a TiDB.

1. En Railway, crea un proyecto desde el repositorio de GitHub y despliega el servicio usando el `Dockerfile` de la raíz.
2. En las variables del servicio configura:
   - `DATABASE_URL`: conexión PyMySQL a TiDB, puerto `4000`, base `artenity_v2` y TLS. Usa `/app/backend/isrgrootx1.pem` como `ssl_ca`; codifica los caracteres especiales de la contraseña para URL.
   - `SECRET_KEY`: clave privada larga y aleatoria.
   - `FRONTEND_URL`: origen de producción de Vercel, sin ruta ni barra final.
   - `BACKEND_URL`: URL pública generada para el servicio de Railway, sin barra final.
3. En TiDB Cloud, permite en la lista de acceso de red las IP de salida de Railway. Restringe el acceso a las IP necesarias; no publiques las credenciales.
4. Genera un dominio público para el servicio de Railway. En Vercel configura `REACT_APP_API_URL` con esa URL, sin barra final, y vuelve a desplegar el frontend.

En Vercel, configura la carpeta `frontend` como raíz del proyecto. La variable `REACT_APP_API_URL` se incorpora durante la compilación, así que cualquier cambio requiere un nuevo despliegue. No uses `localhost` en las variables de producción.

La base TiDB ya debe contener el volcado de tablas y datos; `create_all()` del backend no importa filas. Los archivos que la aplicación sube se guardan bajo `static/`; configura almacenamiento persistente en Railway o un servicio de objetos antes de depender de esos archivos en producción.

Los archivos que la aplicación sube se guardan bajo `static/`. El contenedor no incluye esa carpeta; configura almacenamiento persistente en Railway o un servicio de objetos antes de depender de esos archivos en producción.

## 6. Inicio diario

Abre dos terminales desde la raíz.

Terminal 1 — backend:

```bash
cd /c/Users/camil/Artenity
source backend/venv/Scripts/activate
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Terminal 2 — frontend:

```bash
cd /c/Users/camil/Artenity/frontend
npm start
```

XAMPP debe tener MySQL iniciado antes de arrancar el backend.

## 7. Pruebas

Backend:

```bash
source backend/venv/Scripts/activate
python -m pytest backend/tests -q
```

Frontend:

```bash
cd frontend
npm test -- --watchAll=false
npm run build
```

## 8. Actualización de dependencias

Backend:

```bash
source backend/venv/Scripts/activate
python -m pip install --upgrade pip
python -m pip list --outdated
python -m pip install --upgrade -r backend/requirements.txt
```

Frontend:

```bash
cd frontend
npm outdated
npm update
```

Actualiza las dependencias por lotes y ejecuta las pruebas después de cada grupo importante.

## 9. Estructura principal

```text
Artenity/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── config.py
│   ├── artenity.sql
│   ├── requirements.txt
│   └── tests/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
├── static/
└── README.md
```

## 10. Flujo de archivos subidos

Las imágenes y videos se guardan en `static/` y FastAPI los publica bajo `/static/`.

Carpetas principales:

- `static/perfiles/`
- `static/posts/`
- `static/videos/`
- `static/chat_files/images/`
- `static/chat_files/videos/`
- `static/chat_fondos/`
- `static/reportes/`

No borres estas carpetas cuando ya exista contenido cargado.

## 11. Solución de problemas

### `source: backend/venv/Scripts/activate: No such file`

Estás fuera de la carpeta correcta o el entorno no fue creado.

```bash
cd /c/Users/camil/Artenity
rm -rf backend/venv
py -3.14 -m venv backend/venv
source backend/venv/Scripts/activate
```

### PowerShell bloquea `Activate.ps1`

En PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\backend\venv\Scripts\Activate.ps1
```

En Git Bash no hace falta cambiar la política de ejecución.

### `ModuleNotFoundError`

Confirma que el entorno está activo:

```bash
which python
python -m pip install -r backend/requirements.txt
```

### `Can't connect to MySQL server`

Comprueba que MySQL esté iniciado en XAMPP y que:

- Usuario: `root`
- Base: `artenity`
- Host: `localhost`
- Puerto: `3306`

Luego prueba:

```bash
"C:/xampp/mysql/bin/mysql.exe" -u root -e "SELECT 1;"
```

### `Unknown database 'artenity'`

Crea e importa nuevamente la base:

```bash
"C:/xampp/mysql/bin/mysql.exe" -u root -e "CREATE DATABASE artenity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
"C:/xampp/mysql/bin/mysql.exe" -u root artenity < backend/artenity.sql
```

### Error de CORS

El backend permite por defecto los puertos locales `3000`, `5173` y `8000`. Si cambias el puerto del frontend, actualiza `allow_origins` en `backend/main.py`.

### Error al instalar una dependencia

Captura el paquete y el código completo del error:

```bash
python -m pip install -r backend/requirements.txt
```

Normalmente el problema es usar Python 3.15 con paquetes antiguos o específicos de una plataforma. Usa Python 3.14 y vuelve a crear el entorno.
