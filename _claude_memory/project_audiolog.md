---
name: project-audiolog
description: "AudioLog — app web multi-usuario para profesionales de audio, para registrar horas, proyectos y finanzas"
metadata: 
  node_type: memory
  type: project
  originSessionId: 53b63b35-a54b-41df-968e-8b7a6bd4c74e
---

## Qué es
App web para profesionales de audio para:
- Timer y registro de horas por sesión
- Organización: Cliente > Proyecto > Sesiones
- Finanzas por proyecto (tarifas, estado de pago)
- Estadísticas de horas e ingresos
- Notas por proyecto

## Jerarquía de datos
Cliente → Proyecto → Sesiones / Finanzas / Notas

## Stack
- Frontend: HTML + CSS + JavaScript vanilla
- Auth y DB: Firebase (Authentication + Firestore)
- Hosting: Firebase Hosting
- Control de versiones: GitHub

## Estado (2026-06-01)
- Firebase inicializado, proyecto ID: `audio-log-b1c37`
- Firebase Authentication activado con Email/Password
- Construyendo pantalla de login en `public/index.html`
- El usuario escribe el código línea por línea (quiere aprender haciendo)
- Idioma elegido: `lang="en"` (la app se compartirá con hablantes de inglés)
- VS Code autocomplete desactivado (quickSuggestions, inlineSuggest, autoClosingTags)

## Estado actual de index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AudioLog</title>
  </head>
  <body>
    <div class="login-container">
      
    </div>
  </body>
</html>
```

**Próximo paso:** Añadir `<h1>AudioLog</h1>` dentro del `login-container`, luego el formulario de login.

**Why:** El usuario lo definió junto a Claude.ai antes de comenzar con Claude Code.
**How to apply:** Continuar línea por línea con el index.html. El usuario entiende qué es div y class.
