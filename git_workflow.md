## Este archivo explica cómo trabajar con Git en tu proyecto para que todos sigan las mismas reglas.

Debe incluir:

## a. Convención de commits
Ejemplo:

Copiar
Editar
[HUxx] Acción breve
[HU01] Crear formulario de registro de usuario
[HU04] Conectar API de publicaciones

## b. Frecuencia de push/pull
Pull: antes de empezar a trabajar para traer cambios nuevos.
Push: mínimo 1 vez al día, o al completar una tarea.
Regla: nunca trabajar más de 1 día sin subir cambios.

## c. Política de Pull Requests
Toda rama feature/* debe pasar por revisión antes de llegar a develop.
Un compañero revisa el código y comenta si hay cambios necesarios.
Si está todo bien, se aprueba y se hace merge.

Ejemplo de pasos para un PR:
Subir cambios (git push origin feature/HUxx).
En GitHub, abrir PR desde feature/HUxx hacia develop.
Asignar revisores.

Revisar comentarios y corregir si es necesario.
Merge solo después de aprobación.
Entregables en Informe_AnalisisDiseñoAlistamiento.pdf


