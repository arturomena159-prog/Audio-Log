---
name: project-audiolog
description: "AudioLog — app web multi-usuario para profesionales de audio"
metadata:
  type: project
---

## Qué es
App web para profesionales de audio para registrar horas, proyectos y finanzas.

## Stack
- Frontend: HTML + CSS + JavaScript vanilla
- Auth y DB: Firebase (Authentication + Firestore)
- Hosting: Firebase Hosting
- Control de versiones: GitHub

## Jerarquía de datos
Cliente → Proyecto → Sesiones

## Firestore collections
- `clients` — { name, userId }
- `projects` — { name, clientId, userId }
- `sessions` — { projectId, userId, seconds, date }

## Flujo de navegación
login → dashboard.html → client.html?id=X → project.html?id=X

## Archivos
- `index.html` + `app.js` — login y crear cuenta
- `dashboard.html` + `dashboard.js` — lista de clientes
- `client.html` + `client.js` — proyectos por cliente
- `project.html` + `project.js` — timer + total de horas por proyecto

## Lo que funciona (2026-06-02)
- Login / crear cuenta con Firebase Auth
- Dashboard protegido con onAuthStateChanged
- Crear y listar clientes (Firestore, tiempo real)
- Crear y listar proyectos por cliente
- Timer con Start / Pause / Resume / Stop
- Guardar sesiones en Firestore al dar Stop
- Contador de horas totales por proyecto
