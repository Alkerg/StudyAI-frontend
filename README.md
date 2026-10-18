# StudyAI

StudyAI es una aplicación web para estudiar con ayuda de IA. Permite seleccionar o arrastrar uno o varios archivos PDF, enviarlos al servicio de resúmenes y consultar el contenido resumido desde la interfaz.

## ¿Cómo funciona?

### Requisitos

- Node.js y npm instalados.
- El servicio backend de StudyAI ejecutándose y accesible desde el frontend.

### Instalación

Instala las dependencias del proyecto:

```bash
npm install
```

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto (`frontend/.env`) con la URL del backend:

```env
API_URL=<API_URL>
```

`API_URL` debe apuntar a la dirección donde está ejecutándose la API. El script de configuración genera los archivos de entorno de Angular a partir de esta variable:

```bash
npm run set-envs
```

Ejecuta este comando cada vez que cambies `API_URL`. No incluyas el archivo `.env` en el control de versiones.

### Ejecutar la aplicación

Inicia el servidor de desarrollo:

```bash
npm start
```

Abre [http://localhost:4200/](http://localhost:4200/) en el navegador. La aplicación se recarga automáticamente al modificar los archivos fuente.

## Comandos útiles

Generar una compilación de producción:

```bash
npm run build
```

Ejecutar las pruebas unitarias:

```bash
npm test
```

>[!NOTE]
Este proyecto de Angular fue creado usando [Angular CLI](https://github.com/angular/angular-cli) version 22.1.6