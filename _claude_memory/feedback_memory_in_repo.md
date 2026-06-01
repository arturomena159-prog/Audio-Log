---
name: feedback-memory-in-repo
description: "Al final de cada sesión de trabajo, copiar los archivos de memoria al repo en la carpeta _claude_memory/ y hacer push"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9070b2ee-4021-4a3e-8908-fc3672ac8961
---

Al terminar cada sesión de trabajo en un proyecto, copiar los archivos de memoria a `_claude_memory/` dentro del repo y hacer `git push`.

**Why:** El usuario trabaja desde múltiples dispositivos (Mac y PC). Si la memoria solo vive en `~/.claude/`, se pierde al cambiar de máquina. Así Claude tiene contexto completo en cualquier lugar.

**How to apply:**
- Crear carpeta `_claude_memory/` en la raíz del repo si no existe
- Copiar todos los archivos `.md` de la carpeta de memoria del proyecto
- Hacer commit y push con mensaje tipo "update claude memory"
- Hacerlo siempre que el usuario pida cambiar de dispositivo o al final de sesiones importantes
