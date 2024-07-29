# project_apicol


Este proyecto permite a los usuarios subir un archivo CSV y leer su contenido. Está estructurado para facilitar el desarrollo y la organización del código, con archivos transpilados en JavaScript y separados en carpetas adecuadas para la vista, controladores y modelos.

## Estructura del Proyecto

- **public/**: Contiene los archivos JavaScript transpilados.
- **views/**: Contiene los archivos HTML y CSS.
  - **index.html**: El archivo HTML principal.
  - **styles/style.css**: El archivo CSS principal.
- **src/**: Contiene el código fuente en TypeScript.
  - **controllers/**: Contiene los controladores del proyecto.
  - **models/**: Contiene los modelos del proyecto.

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. Clona el repositorio:

    git clone <https://github.com/andresfelipe26/project_apicol.git>
    cd <project_apicol>


2. Inicializa el proyecto y instala las dependencias:
    npm init -y
    npm install

3. Transpila el código TypeScript a JavaScript:
    tsc -watch