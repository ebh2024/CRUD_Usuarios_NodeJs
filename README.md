# API CRUD de Usuarios con Express

Esta es una API REST simple creada con Node.js y Express para gestionar una lista de usuarios almacenada en memoria.

## Requisitos

*   Node.js (v14 o superior recomendado)
*   npm (generalmente viene con Node.js)
*   Un cliente API como [Postman](https://www.postman.com/) o [Thunder Client](https://www.thunderclient.com/) (extensión para VS Code)

## Instalación

1.  Clona este repositorio (o descarga los archivos).
2.  Navega a la carpeta del proyecto en tu terminal.
3.  Instala las dependencias:
    ```bash
    npm install
    ```

## Ejecución

Para iniciar el servidor API, ejecuta el siguiente comando en la terminal desde la carpeta del proyecto:

```bash
node server.js
```

Verás un mensaje indicando que el servidor está escuchando en `http://localhost:3000`.

## Endpoints de la API

La URL base para todos los endpoints es `http://localhost:3000`.

### 1. Obtener todos los usuarios

*   **Método:** `GET`
*   **URL:** `/usuarios`
*   **Descripción:** Devuelve una lista de todos los usuarios registrados.
*   **Postman:**
    *   Crea una nueva solicitud.
    *   Selecciona el método `GET`.
    *   Ingresa la URL: `http://localhost:3000/usuarios`.
    *   Haz clic en "Send".
*   **Respuesta Exitosa (200 OK):**
    ```json
    [
      {
        "id": 1,
        "nombre": "Juan Perez",
        "email": "juan.perez@example.com",
        "edad": 30
      },
      {
        "id": 2,
        "nombre": "Maria Garcia",
        "email": "maria.garcia@example.com",
        "edad": 25
      }
    ]
    ```
    *(Inicialmente, la respuesta será `[]`)*

### 2. Obtener un usuario por ID

*   **Método:** `GET`
*   **URL:** `/usuarios/:id` (reemplaza `:id` con el ID numérico del usuario)
*   **Descripción:** Devuelve los detalles de un usuario específico.
*   **Postman:**
    *   Crea una nueva solicitud.
    *   Selecciona el método `GET`.
    *   Ingresa la URL: `http://localhost:3000/usuarios/1` (usa un ID existente).
    *   Haz clic en "Send".
*   **Respuesta Exitosa (200 OK):**
    ```json
    {
      "id": 1,
      "nombre": "Juan Perez",
      "email": "juan.perez@example.com",
      "edad": 30
    }
    ```
*   **Respuesta Error (404 Not Found):** Si el ID no existe.
    ```json
    {
      "message": "Usuario no encontrado"
    }
    ```

### 3. Crear un nuevo usuario

*   **Método:** `POST`
*   **URL:** `/usuarios`
*   **Descripción:** Agrega un nuevo usuario a la lista.
*   **Postman:**
    *   Crea una nueva solicitud.
    *   Selecciona el método `POST`.
    *   Ingresa la URL: `http://localhost:3000/usuarios`.
    *   Ve a la pestaña "Body".
    *   Selecciona la opción "raw".
    *   En el desplegable de la derecha, elige "JSON".
    *   Pega el siguiente JSON en el área de texto (modifica los datos si quieres):
        ```json
        {
          "nombre": "Carlos Lopez",
          "email": "carlos.lopez@example.com",
          "edad": 45
        }
        ```
    *   Haz clic en "Send".
*   **Respuesta Exitosa (201 Created):** Devuelve el usuario recién creado con su ID asignado.
    ```json
    {
      "id": 3, // El ID será asignado automáticamente
      "nombre": "Carlos Lopez",
      "email": "carlos.lopez@example.com",
      "edad": 45
    }
    ```
*   **Respuesta Error (400 Bad Request):** Si faltan datos o el email ya existe.
    ```json
    {
      "message": "Faltan datos obligatorios: nombre, email y edad son requeridos"
    }
    ```
    ```json
    {
      "message": "El email ya está registrado"
    }
    ```

### 4. Actualizar un usuario existente

*   **Método:** `PUT`
*   **URL:** `/usuarios/:id` (reemplaza `:id` con el ID numérico del usuario a actualizar)
*   **Descripción:** Modifica los datos de un usuario existente. Se debe enviar al menos un campo para actualizar.
*   **Postman:**
    *   Crea una nueva solicitud.
    *   Selecciona el método `PUT`.
    *   Ingresa la URL: `http://localhost:3000/usuarios/1` (usa un ID existente).
    *   Ve a la pestaña "Body".
    *   Selecciona la opción "raw" y "JSON".
    *   Pega el JSON con los campos a actualizar:
        ```json
        {
          "nombre": "Juan Alberto Perez",
          "edad": 31
        }
        ```
        *(Puedes incluir `nombre`, `email` y/o `edad`)*
    *   Haz clic en "Send".
*   **Respuesta Exitosa (200 OK):** Devuelve el objeto completo del usuario actualizado.
    ```json
    {
      "id": 1,
      "nombre": "Juan Alberto Perez",
      "email": "juan.perez@example.com", // El email no cambió en este ejemplo
      "edad": 31
    }
    ```
*   **Respuesta Error (404 Not Found):** Si el ID no existe.
    ```json
    {
      "message": "Usuario no encontrado para actualizar"
    }
    ```
*   **Respuesta Error (400 Bad Request):** Si se intenta usar un email que ya pertenece a otro usuario.
    ```json
    {
      "message": "El nuevo email ya está registrado por otro usuario"
    }
    ```

### 5. Eliminar un usuario

*   **Método:** `DELETE`
*   **URL:** `/usuarios/:id` (reemplaza `:id` con el ID numérico del usuario a eliminar)
*   **Descripción:** Elimina un usuario de la lista.
*   **Postman:**
    *   Crea una nueva solicitud.
    *   Selecciona el método `DELETE`.
    *   Ingresa la URL: `http://localhost:3000/usuarios/2` (usa un ID existente).
    *   Haz clic en "Send".
*   **Respuesta Exitosa (200 OK):**
    ```json
    {
      "message": "Usuario con ID 2 eliminado correctamente"
    }
    ```
*   **Respuesta Error (404 Not Found):** Si el ID no existe.
    ```json
    {
      "message": "Usuario no encontrado para eliminar"
    }
