# Proyecto: Sistema de Mensajería Modularizado en React y TypeScript

Este proyecto demuestra un sistema modularizado para enviar mensajes a candidatos. La aplicación permite seleccionar plantillas de mensaje, elegir canales (SMS, Correo electrónico y WhatsApp) y simular el envío de mensajes a múltiples candidatos. La simulación se realiza mostrando el payload en formato JSON en la consola.

## Simulación del Envío al Backend

La función `sendMessages` en `src/services/messageService.ts` recibe un payload que incluye:
- Tipo de plantilla.
- Canales seleccionados.
- Un arreglo de mensajes por candidato, en el cual cada objeto contiene el candidato y sus mensajes para cada canal.

El payload se imprime en la consola usando `JSON.stringify` con una indentación de 2 espacios para facilitar la lectura. Se simula un retardo (por ejemplo, 1 segundo) para emular una petición real.

## Cómo Ejecutar el Proyecto

1. **Instalar Dependencias**  
   Asegúrate de tener instaladas las dependencias necesarias. Ejecuta:

   npm install

2. **Ejecutar**  

   npm run dev