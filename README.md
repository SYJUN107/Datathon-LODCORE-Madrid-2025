# Datathon-LODCORE-Madrid-2025

Fuente de Datasets: https://docs.google.com/spreadsheets/d/1C1XZEh7oc3Sd_V21CLshdMPUGyKLapCDNJgKhI0urJE/edit?gid=1098144233#gid=1098144233

Para probar el demo:

1. Inicia el servidor local: Abre una terminal en la carpeta donde está tu archivo index.html y ejecuta el comando

    python -m http.server 8000

    Esto levanta un servidor web en el puerto 8000 de tu máquina.

2. Accede a la página en el navegador: Abre tu navegador y escribe la dirección:

    http://localhost:8000/index.html

3. Opcional: Chatbot

    Para el uso del chatbot se necesita crear un secrets.js en el directorio raiz con el contenido:
    
    window.SECRETS = window.SECRETS || {};
    window.SECRETS.OPENROUTER_API_KEY = API_KEY;

    El API_KEY se obtiene de Openrouter.