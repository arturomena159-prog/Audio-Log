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
      <h1>AudioLog</h1>
      <form id="login-form">
        <input type="email" id="email" placeholder="Email">
        <input type="password" id="password" placeholder="Password">
        <button type="submit">Log in</button>
        <button type="button" id="create-account">Create account</button>
      </form>
    </div>
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"></script>
    <script src="app.js"></script>
  </body>
</html>
```

## Estado actual de app.js
- Firebase inicializado con firebaseConfig
- `auth.signInWithEmailAndPassword` — login funcional (probado, muestra alert)
- `auth.createUserWithEmailAndPassword` — crear cuenta funcional
- Ambos con `.then()` / `.catch()` para éxito y error
- Comentarios con `//` en todo el archivo explicando cada bloque

**Próximo paso:** Reemplazar `alert("Successful Login!")` con redirección a la pantalla principal (dashboard). La pantalla principal aún no existe.

**Why:** El usuario lo definió junto a Claude.ai antes de comenzar con Claude Code.
**How to apply:** Continuar línea por línea con el index.html. El usuario entiende qué es div y class.
