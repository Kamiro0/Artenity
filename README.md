# Artenity — Plataforma social para artistas

Artenity es una aplicación web para crear, compartir y descubrir obras de arte, gestionar perfiles de artista, seguir a otros usuarios y reportar contenido. Este README reúne todo lo necesario para entender, instalar, configurar, ejecutar y contribuir al proyecto.

---

## Contenido rápido
- Título y propósito
- Tecnologías y stack
- Requisitos
- Estructura del repositorio
- Configuración (env, DB, dependencias)
- Comandos (instalación, ejecución, tests, migraciones)
- Endpoints / archivos clave
- Contribución, licencias y contacto

---

## 1. Título y propósito
Artenity — Plataforma social para artistas  
Propósito: ofrecer una red social especializada en arte para publicar obras, gestionar perfiles, seguir artistas, recibir notificaciones y reportar contenido inapropiado.

---

## 2. Tecnologías (stack)
- Lenguaje backend: Python 3.10+
- Framework backend: FastAPI (ASGI: Uvicorn)
- ORM / modelos: SQLAlchemy / SQLModel
- Base de datos: MariaDB / MySQL (compatible con PyMySQL)
- Frontend: React (TypeScript)
- Tests: pytest (backend)
- Otras: Alembic (migraciones opcional), npm/yarn (frontend)

Archivos relevantes:
- Backend: `backend/main.py`, `backend/models.py`, `backend/schemas.py`, `backend/database.py`
- Frontend: `frontend/src/...` (`PerfilUsuario.tsx`, `services/api.ts`, etc.)

---

## 3. Requisitos previos (software)
- Python 3.10+
- pip
- Node.js 18+ y npm
- MariaDB / MySQL (cliente `mysql` y servidor)
- Git (recomendado)
- Windows: PowerShell o CMD (ejemplos incluidos)

---

## 4. Estructura del repositorio (resumen)
- /backend
  - main.py, models.py, schemas.py, database.py, requirements.txt, artenity.sql, tests/
- /frontend
  - package.json, src/, public/
- /README.md (este archivo)
- /LICENSE (sugerido)
- /static (si aplica: imágenes, uploads)

(Estructura completa disponible en el repo)

---

## 5. Configuración paso a paso (Windows)

1) Clonar:
```bash
git clone <repo-url> Artenity2.0
cd Artenity2.0
```


2) Backend: crear entorno virtual e instalar dependencias
```bash
python -m venv backend\venv
# PowerShell
backend\venv\Scripts\Activate.ps1
# CMD
backend\venv\Scripts\activate
pip install -r backend/requirements.txt
```

3) Variables de entorno (usar `backend/.env`, no subir `.env`):
Crear `backend/.env` o `backend/.env.example` con:
```env
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/artenity
SECRET_KEY=change_this_to_a_strong_secret
ALLOWED_HOSTS=localhost,127.0.0.1
MEDIA_ROOT=./static
DEBUG=True
```
Temporal en PowerShell:
```powershell
$env:DATABASE_URL="mysql+pymysql://user:password@localhost:3306/artenity"
$env:SECRET_KEY="mi_secreto"
```

4) Base de datos: crear DB e importar dump (opcional)
```bash
# crear base (usando cliente mysql)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS artenity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p artenity < backend/artenity.sql
```

5) Frontend: instalar dependencias
```bash
cd frontend
npm install
cd ..
```

---

## 6. Ejecutar en modo desarrollo

1) Backend (con venv activado, raíz del repo):
```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```
API en: http://localhost:8000  
Documentación automática (si FastAPI expone): http://localhost:8000/docs y /redoc

2) Frontend (otra terminal):
```bash
cd frontend
npm start
```
Frontend en: http://localhost:3000

---

## 7. Migraciones / Crear esquema (opcional)
- Si usa Alembic:
```bash
# generar y aplicar migración
alembic revision --autogenerate -m "mensaje"
alembic upgrade head
```
- Si no hay Alembic y usa SQLModel/SQLAlchemy:
- Crear un script como `backend/scripts/create_db.py` que importe modelos y haga `SQLModel.metadata.create_all(engine)`.

---

## 8. Tests
Ejecutar tests backend:
```bash
# desde la raíz o backend/
pytest -q
# con coverage
coverage run -m pytest && coverage html
```
Tests detectados en `backend/tests/`.

---

## 9. Endpoints y archivos clave
- Rutas FastAPI definidas en `backend/main.py`. Revisar ese archivo para endpoints exactos.
- Funciones/acciones comunes:
  - publicar / crear publicación — revisar controlador correspondiente (`crear_publicacion` u otro nombre) en `backend/main.py`
  - reportar usuario — revisar `reportar_usuario` en `backend/main.py`
  - autenticación / sesiones — revisar `frontend/context/AuthContext.tsx` y `frontend/services/api.ts`
- Frontend:
  - `frontend/src/components/PerfilUsuario.tsx` (perfil y reporte)
  - `frontend/src/services/api.ts` (cliente HTTP y manejo de tokens)

(Revisar archivos para nombres exactos de endpoints y payloads)

---

## 10. Buenas prácticas y seguridad
- No subir `.env` ni credenciales reales al repositorio.
- Usar SECRET_KEY fuerte y credenciales DB seguras.
- Hacer backups de la base de datos antes de cambios destructivos.
- Añadir validaciones y límites en uploads (tamaño, tipo MIME).
- Usar HTTPS en producción y configurar CORS/ALLOWED_HOSTS correctamente.

---

## 11. Contribuir
- Flujo: Fork → branch feature/issue-### → commit → PR.
- Incluir tests para cambios funcionales.
- Usar linters/formatters: Black, isort, flake8 (Python); ESLint/Prettier (frontend).
- Añadir `.github/ISSUE_TEMPLATE/` y `.github/PULL_REQUEST_TEMPLATE/` (se sugiere).

Plantilla mínima de PR:
- Resumen breve
- Issue relacionado
- Cambios realizados
- Cómo probar localmente

---

## 12. Licencia y contacto
- Licencia: MIT (añadir `LICENSE` con texto).
- Contacto: autor@example.com (reemplazar por email real).

---

## 13. Comandos útiles de referencia
```bash
# activar virtualenv (Windows)
backend\venv\Scripts\activate

# instalar dependencias backend
pip install -r backend/requirements.txt

# iniciar backend
uvicorn backend.main:app --reload --port 8000

# instalar frontend y arrancar
cd frontend
npm install
npm start

# ejecutar tests
pytest -q
```
# 14. Editar commit

git commit --amend -m "Nuevo mensaje del último commit"
git push --force

## Estándares de Estilo de Código (Propuesta Formal)

| **Regla de Estilo** | **Convención Elegida (Ej. camelCase, snake_case, etc.)** | **Justificación para la Elección (explicada con tus palabras)** |
|----------------------|-----------------------------------------------------------|------------------------------------------------------------------|
| **1. Nombres de Variables** | `camelCase` | Elegí esta convención porque es la más común en JavaScript y en la mayoría de los lenguajes modernos. Empieza con minúscula y cada palabra nueva va con mayúscula, lo que hace que el código se vea limpio y ordenado. Además, facilita leer nombres largos sin tener que usar guiones o símbolos. |
| **2. Nombres de Funciones/Métodos** | `camelCase` | Las funciones y métodos también van con esta forma porque normalmente representan acciones. Por ejemplo, `calcularPromedio()` o `obtenerUsuario()`. Se entiende rápido que son tareas o procesos, y al tener el mismo estilo que las variables, el código se ve más consistente y profesional. |
| **3. Nombres de Clases/Componentes** | `PascalCase` | Esta convención se usa para las clases y componentes (como los de React) porque ayuda a distinguirlos fácilmente del resto del código. Por ejemplo, `UsuarioPerfil` o `PublicacionObra`. Se ve más organizado y deja claro que son estructuras o plantillas importantes dentro del sistema. |
| **4. Nivel de Indentación** | `2 espacios` | Decidí usar 2 espacios porque el código queda más compacto y fácil de leer. Si se usan muchos espacios, se ve recargado. Usar 2 espacios también es lo más común en proyectos con JavaScript y ayuda a que el trabajo en equipo sea más ordenado, sin tener líneas desalineadas. |

## Automatización del Estilo de Código

| **Elemento** | **Descripción del Plan** |
|---------------|--------------------------|
| **Herramienta de Formato (Linter o Formatter)** | Usaremos **Prettier** junto con **ESLint** en el proyecto, porque ayudan a mantener el código limpio y con el mismo formato automáticamente. Cada vez que se guarde un archivo, se aplicarán las reglas sin tener que hacerlo manualmente. |
| **Archivo de Configuración** | Se crearán los archivos **`.prettierrc`** y **`.eslintrc.json`** dentro del repositorio. Estos archivos guardan las reglas del formato (como usar comillas simples, 2 espacios y camelCase). Así, todos los que trabajen en el proyecto tendrán el mismo estilo de código, sin importar el computador o editor que usen. |
| **Plan de Implementación** | 1. Instalar **Prettier** y **ESLint** en el proyecto.<br>2. Crear los archivos de configuración con las reglas básicas.<br>3. Activar el formato automático al guardar en **VS Code**.<br>4. Subir los archivos de configuración a **GitHub**.<br>5. Hacer pruebas en grupo para comprobar que todos los códigos se vean igual. |
| **Beneficio para el Proyecto** | Con esto, se evitan discusiones sobre cómo debe verse el código y se ahorra tiempo al revisar errores pequeños. Así el equipo puede concentrarse en la lógica y no en los espacios o las comillas. También ayuda a mantener el proyecto profesional y organizado. |

## 🧩 Convención de Commits (Registro y Justificación)

| **Tipo de Commit** | **Ejemplo Práctico (máx. 8 palabras)** | **Razón de la Elección (explicación con tus palabras)** |
|----------------------|------------------------------------------|------------------------------------------------------------|
| **feat (nueva funcionalidad)** | `feat: OLVIDASTE TU CONTRASEÑA` | Este commit agrega una nueva característica al sistema que permite recuperar la contraseña. Se usa **feat** para dejar claro que se trata de una función nueva. |
| **feat (nueva funcionalidad)** | `feat: integrar recuperación de contraseña por correo` | Indica una mejora al sistema de recuperación. Elegí este formato porque muestra claramente qué parte del sistema se modificó y con qué propósito. |
| **fix (corrección de error)** | `fix: input del perfil no funcionaba` | Este commit corrige un error en el formulario del perfil. El prefijo **fix** permite identificar rápido que fue una reparación y no una nueva función. |
| **feat (nueva funcionalidad)** | `feat: seguir y seguido en perfiles` | Implementa la función de seguir y dejar de seguir a otros usuarios. **feat** lo clasifica como una nueva característica dentro del módulo de usuarios. |
| **feat (nueva funcionalidad)** | `feat: reporte de usuarios` | Este cambio agrega un sistema de reportes. Usar **feat** ayuda a mantener la trazabilidad de cuándo se implementó esta nueva opción. |
| **fix (corrección de error)** | `fix: default del perfil corregido` | Corrige el problema de carga del perfil. Elegí el prefijo **fix** porque muestra que fue una corrección técnica menor, no una gran mejora. |
| **chore (mantenimiento o actualización general)** | `chore: actualización del perfil` | Representa una actualización del módulo de perfil sin cambios en la lógica principal. **chore** se usa para tareas internas del sistema. |
| **chore (mantenimiento o actualización general)** | `chore: actualizar datos del perfil` | Es una actualización normal que no agrega nuevas funciones. El uso de **chore** aclara que fue una mejora de mantenimiento. |
| **fix (corrección de error)** | `fix: corregido error en perfil de usuario` | Señala que se arregló un error que afectaba al perfil. Se usa **fix** para dejar registro de que se trató de una reparación puntual. |
| **feat (nueva funcionalidad)** | `feat: integración del módulo de recuperación` | Indica la integración final del módulo de recuperación de contraseñas. Usar **feat** ayuda a seguir el orden de desarrollo de nuevas funciones. |

## 🌿 Registro de Ramas y Trazabilidad de Funcionalidades

| **Rama (Branch Name)** | **Objetivo / Funcionalidad Implementada** | **Motivo de la Creación de la Rama (Propósito)** | **Estado Final** |
|--------------------------|--------------------------------------------|--------------------------------------------------|------------------|
| **MAIN** | Implementar la opción de recuperar la contraseña por correo electrónico. | Permitir que los usuarios restablezcan su contraseña cuando la olviden. | ✅ Completada |
| **ART-1** | Desarrollar el módulo del perfil de usuario. | Crear y editar la información personal del usuario. | ✅ Completada |
| **ART-2** | Agregar la función de seguir y dejar de seguir usuarios. | Mejorar la interacción entre artistas dentro de la plataforma. | ✅ Completada |
| **ART-3** | Corregir el error que impedía actualizar el perfil. | Resolver fallos en el formulario de perfil para garantizar la edición correcta. | ✅ Corregida |
| **ART-4** | Implementar el sistema de reportes de usuarios. | Permitir reportar comportamientos inapropiados dentro de la red social. | ✅ Completada |
| **ART-5** | Arreglar el problema con el perfil por defecto. | Evitar errores al crear cuentas nuevas sin imagen o datos iniciales. | ✅ Corregida |
| **ART-6** | Añadir la creación, edición y eliminación de publicaciones. | Controlar el contenido que los usuarios comparten en su muro. | 🕓 En revisión |
| **ART-7** | Crear sistema de notificaciones en tiempo real. | Avisar al usuario cuando alguien reacciona, comenta o sigue su perfil. | 🕓 En desarrollo |
| **ART-8** | Mejorar la autenticación de usuarios. | Asegurar el ingreso al sistema con validaciones y cifrado. | ✅ Completada |
| **ART-9** | Actualizar el diseño de la interfaz del perfil y del muro principal. | Mejorar la presentación visual de la plataforma. | ✅ Finalizada |


