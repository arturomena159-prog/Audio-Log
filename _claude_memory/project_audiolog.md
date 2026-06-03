---
name: project-audiolog
description: "AudioLog — app web multi-usuario para profesionales de audio, para registrar horas, proyectos y finanzas"
metadata: 
  node_type: memory
  type: project
  originSessionId: b6c6c625-b1fb-4962-8c62-02ee8d62d6b9
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
- Hosting: Firebase Hosting (configurado en firebase.json, public dir = "public")
- Control de versiones: GitHub (branch main, remote configurado)
- Firebase proyecto ID: `audio-log-b1c37`

## Estado (2026-06-03) — TODO FUNCIONAL

### index.html / app.js
- Login con Email/Password ✅

### dashboard.html / dashboard.js
- Lista de clientes en tiempo real ✅
- Formulario agregar cliente con nombre + tipo (Artist/Producer/Label/Director) ✅
- Stats globales: total hours (de sessions), total billed (Fixed+Paid), pending to collect (Fixed+Pending/Partial) ✅

### client.html / client.js
- Carga nombre del cliente desde Firestore ✅
- Lista de proyectos con nombre y tipo ✅
- Formulario agregar proyecto con nombre + tipo (Cine/Atmos/Mezcla/Master/Rodaje) ✅

### project.html / project.js
- Timer (Start/Pause/Resume/Stop) ✅
- Sesiones guardadas en Firestore con segundos y fecha ✅
- Total de horas calculado en tiempo real ✅
- **Finanzas completas:**
  - Payment type: Hourly / Fixed / No charge ✅
  - Hourly: tarifa/hora + estimated total calculado ✅
  - Fixed: monto total + effective hourly rate (solo si ≥1h registrada) ✅
  - Payment status: Pending / Paid / Partial ✅
  - Partial: muestra campos amount paid + remaining calculado ✅
  - Save guarda en Firestore, Load restaura al abrir ✅
- **Notas:** agregar, ver en tiempo real, borrar ✅

## Detalles técnicos importantes
- `lastTotalSeconds` — variable global en project.js que guarda segundos de sesiones para sincronizar con carga de finanzas
- `updateFinanceCalculations()` — función global en project.js, llamada tanto desde onSnapshot de sesiones como desde carga de finanzas
- Firestore requiere índice compuesto para `notes` (where projectId + orderBy date) — **ya creado** en Firebase console
- Stats dashboard: hourly projects no se suman en billed/pending (requeriría join sesiones+proyectos)
- Firebase CLI no instalado en la máquina — Node.js tampoco. Hay que instalar Node.js desde nodejs.org (LTS) para poder hacer `firebase deploy`
- **Bug conocido en project.js:** el listener de `add-note` y el onSnapshot de `notes` están anidados dentro del `.get().then()` de finanzas — pueden registrarse múltiples veces si el usuario recarga las finanzas. Pendiente refactorizar.

## Plan pendiente
- [ ] client.html/js: total de horas del cliente y total facturado
- [ ] CSS — dar estilo profesional a toda la app
- [ ] Instalar Node.js + Firebase CLI para hacer deploy a Firebase Hosting
- [ ] Vista compartible para artistas (ver proyecto, dejar comentarios, sin acceso a finanzas/timer)
- [ ] Calcular billed/pending para proyectos Hourly en dashboard

## Ideas futuras
- Compartir URL del proyecto con artistas para que pongan notas/comentarios
- Calcular hourly earnings en stats globales del dashboard

**Why:** App para profesionales de audio para registrar horas, proyectos y finanzas por cliente.
**How to apply:** Implementar paso a paso, el usuario escribe el código guiado por Claude.
