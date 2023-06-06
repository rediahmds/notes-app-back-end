# ℹ️ Notes App Back-end API

This is a dummy project created by Dicoding for the purpose of learning and experimenting in their online course ["Belajar Fundamental Aplikasi Back-End"](https://www.dicoding.com/academies/271).

## 📁 Project Structure

```plain-text
src
├── api
│ └── notes
│  ├── handler.js
│  ├── index.js
│  └── routes.js
├── services
│ └── inMemory
│   └── NotesService.js
└── server.js
```

### 🔨 File and Directory Functionality

`src`: there are two folders and a JS file inside, `api`, `services` and `server.js`

- The `src/server.js` file still retains the same functionality, enabling the creation, configuration, and running of an Hapi HTTP server. Additionally, the plugin registration process will be handled within this file.
- The `src/api` folder is to house any plugins that may be installed. So, each folder inside `src/api` represent a plugin and also a route. There is a specific folder called `src/api/notes` that serves as a plugin.
  - Inside `src/api/notes` folder or inside each plugin folder, generally speaking, contains three JavaScript files, `handler.js`, `index.js` and `routes.js`. This directory is responsible to handle requests that comes to `/notes` endpoint
  - `index.js` is the place to define our plugin. It will consume both `routes.js` and `handler.js`
  - `routes.js` is the place where we define our `/notes` route and which function to handle the request.
  - `handler.js` is the place to define function to handle request that comes to `/notes` endpoint.
- The `src/services` is to contains the whole function to CRUD a resource. This is different with `src/api/notes/handler.js`. `service` will focus on CRUD to a resource, while `handler.js` focus on how to handle response.
  - The `src/services/inMemory/NotesService.js` purpose is to manage the notes `inMemory` (using an array to mock database)
