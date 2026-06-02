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

## Estado (2026-06-02)
- Firebase inicializado, proyecto ID: `audio-log-b1c37`
- Firebase Authentication activado con Email/Password
- Login funcional — probado y confirmado con usuario real en Firebase
- Toda la UI y mensajes en inglés
- VS Code: autocompletado desactivado, shortcut Ctrl+Esc remapeado a Ctrl+Alt+C

## Archivos actuales
- `public/index.html` — formulario de login completo (h1, form, inputs, button, Firebase SDK, app.js)
- `public/app.js` — lógica de login completa (config, init, auth, event listener, signIn, then/catch)

## Estado actual de app.js
```javascript
const firebaseConfig = { ... }; // credenciales del proyecto
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        .then(function() { alert("Successful Login!"); })
        .catch(function(error) { alert(error.message); });
});
```

**Próximo paso:** Reemplazar el alert de "Successful Login!" con redirección a la pantalla principal de la app.

**Why:** El alert es temporal para verificar que el login funciona. Funciona correctamente.
**How to apply:** Continuar construyendo la pantalla principal (dashboard) y redirigir desde el .then().
