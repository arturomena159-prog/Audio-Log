# Análisis de aprendizaje — AudioLog

> Este archivo debe actualizarse al final de cada sesión de trabajo importante.
> Última actualización: 2026-06-02

## Perfil del estudiante
Profesional de audio (cine, mezcla, Atmos, mastering) sin experiencia previa en programación.
Aprende mejor haciendo — no memorizando teoría.

## Lo que ya domina

### HTML
- Estructura básica: DOCTYPE, html, head, body
- Etiquetas semánticas: header, main, section, h1-h2, p, ul, li, form
- Atributos: id, class, type, placeholder, href, disabled
- Scripts al final del body y por qué
- Diferencia entre type="submit" y type="button"

### JavaScript
- `const` vs `let` — cuándo usar cada uno
- `document.getElementById()` — seleccionar elementos del DOM
- `addEventListener("click", function() {...})` — escuchar eventos
- Estructura de bloques con `{}` y la importancia del orden
- `window.location.href` — navegar entre páginas
- `URLSearchParams` — leer parámetros de la URL
- `setInterval` / `clearInterval` — crear y detener timers
- `Math.floor`, `%` (módulo) — convertir segundos a HH:MM:SS
- `.padStart()` — formatear números con ceros a la izquierda
- `document.createElement` / `appendChild` — crear elementos dinámicamente
- `textContent` — cambiar texto de un elemento

### Firebase
- Inicializar Firebase con `firebaseConfig`
- `auth.signInWithEmailAndPassword` y `createUserWithEmailAndPassword`
- `auth.onAuthStateChanged` — proteger páginas y esperar confirmación de sesión
- `auth.signOut` — cerrar sesión
- `db.collection().add()` — guardar datos
- `db.collection().where().onSnapshot()` — leer datos en tiempo real
- `db.collection().doc().get()` — leer un documento específico
- Jerarquía de colecciones: clients → projects → sessions

## Hitos importantes
- **Primera feature implementada solo:** botón de "enable start al pausar" — lo identificó como bug y lo resolvió sin ayuda
- **Primer troubleshoot exitoso:** identificó que `NaN` venía de un campo mal nombrado en Firestore
- **Primer `touch` + `ls` + verificación:** aprendió el flujo de crear archivos en terminal y verificar

## Patrones de error frecuentes
- Typos en nombres de métodos (`onSpanshot`, `geElementById`, `assEventListener`)
- Olvidar guardar con Cmd+S antes de probar
- Comentar bloques enteros incluyendo los `}` de cierre
- Abrir archivos con doble click en vez de desde el servidor local

## Actitud y ritmo
- Muy curioso — siempre pregunta el "por qué" detrás del código
- Persistente — no se rinde ante los errores
- Empezó a leer el código con más confianza hacia el final de la sesión
- Buen instinto para cuestionar antes de seguir

## Próximos conceptos a introducir
- CSS básico para que la app se vea bien
- Eliminar clientes/proyectos (botón de delete)
- Mostrar lista de sesiones individuales por proyecto
- Despliegue en Firebase Hosting para compartir con otros
