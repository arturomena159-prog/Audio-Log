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
Cliente → Proyecto → Sesiones / Finanzas / Notas / Planning

## Stack
- Frontend: HTML + CSS + JavaScript vanilla
- Auth y DB: Firebase (Authentication + Firestore)
- Hosting: Firebase Hosting (configurado en firebase.json, public dir = "public")
- Control de versiones: GitHub (branch main, remote configurado)
- Firebase proyecto ID: `audio-log-b1c37`

## Estado (2026-06-05) — TODO FUNCIONAL

### index.html / app.js
- Login con Email/Password ✅

### dashboard.html / dashboard.js
- Lista de clientes en tiempo real ✅
- Formulario agregar cliente con nombre + tipo (Artist/Producer/Label/Director) ✅
- Stats globales: total hours, total billed, pending to collect ✅
- **Lista de Active Projects** con nombre (link), fecha de entrega, barra de progreso y % ✅
- Proyectos ordenados por urgencia (fecha de entrega más próxima primero) ✅

### client.html / client.js
- Carga nombre del cliente desde Firestore ✅
- Lista de proyectos con nombre y tipo ✅
- Formulario agregar proyecto con nombre + tipo ✅

### project.html / project.js
- Timer (Start/Pause/Resume/Stop) ✅
- Sesiones guardadas en Firestore con segundos y fecha ✅
- Total de horas calculado en tiempo real ✅
- Finanzas completas: Hourly/Fixed/No charge, Payment status, Partial ✅
- Notas: agregar, ver en tiempo real, borrar ✅
- **Planning:** fecha de entrega, fecha de pago, slider de progreso (0-100%) ✅

## Firestore collections
- `clients` — { name, type, userId }
- `projects` — { name, clientId, userId, paymentType, paymentStatus, rate, amount, amountPaid, deliveryDate, paymentDate, progress }
- `sessions` — { projectId, userId, seconds, date }
- `notes` — { projectId, userId, text, date }

## Detalles técnicos importantes
- `lastTotalSeconds` — variable global en project.js que sincroniza segundos con cálculos de finanzas
- `updateFinanceCalculations()` — función global en project.js, llamada desde onSnapshot de sesiones y desde carga de finanzas
- Firestore requiere índice compuesto para `notes` (where projectId + orderBy date) — ya creado
- Stats dashboard: hourly projects no se suman en billed/pending
- Firebase CLI no instalado — Node.js tampoco. Instalar desde nodejs.org (LTS) para `firebase deploy`
- **Bug conocido en project.js:** listener de `add-note` y onSnapshot de `notes` están anidados dentro del `.get().then()` de finanzas — pueden registrarse múltiples veces si el usuario recarga. Pendiente refactorizar.

## Plan pendiente
- [ ] CSS — dar estilo profesional a toda la app ← SIGUIENTE
- [ ] client.html/js: total de horas del cliente y total facturado
- [ ] Instalar Node.js + Firebase CLI para hacer deploy a Firebase Hosting
- [ ] Vista compartible para artistas (ver proyecto, dejar comentarios, sin acceso a finanzas/timer)
- [ ] Calcular billed/pending para proyectos Hourly en dashboard

**Why:** App para profesionales de audio para registrar horas, proyectos y finanzas por cliente.
**How to apply:** El usuario entiende bien los patrones de guardar/cargar/escuchar de Firestore, bloques if/else, y la estructura del código. Puede ir a buen ritmo. Siguiente paso acordado: CSS.
