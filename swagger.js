const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Clon de Instagram',
    description: 'API REST para un clon de Instagram. Permite registrarse, iniciar sesión, ' +
      'ver y editar el perfil propio, y publicar/ver/eliminar publicaciones.',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  tags: [
    { name: 'Autenticación', description: 'Registro e inicio de sesión' },
    { name: 'Usuarios', description: 'Perfil del usuario autenticado' },
    { name: 'Publicaciones', description: 'Feed y publicaciones' },
  ],
  // Modelos (estructuras de datos) reutilizados por varios endpoints.
  definitions: {
    Usuario: {
      id: 1,
      nombre_usuario: 'gato_programador',
      nombre_completo: 'Juan Perez',
      email: 'juan@test.com',
      foto_perfil: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
      biografia: 'Amante de los gatos y el código.',
      fecha_creacion: '2026-09-18T12:05:47.786Z'
    },
    RegistroUsuario: {
      nombre_usuario: 'gato_programador',
      nombre_completo: 'Juan Perez',
      email: 'juan@test.com',
      password: '123456'
    },
    LoginUsuario: {
      email: 'juan@test.com',
      password: '123456'
    },
    ActualizarPerfil: {
      nombre_completo: 'Juan Perez',
      biografia: 'Nueva biografía',
      foto_perfil: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nuevo'
    },
    Publicacion: {
      id: 1,
      usuario_id: 1,
      url_imagen: 'https://cataas.com/cat',
      descripcion: 'Mi gato durmiendo la siesta',
      likes: 5,
      fecha_creacion: '2026-09-18T12:05:47.786Z'
    },
    NuevaPublicacion: {
      url_imagen: 'https://cataas.com/cat',
      descripcion: 'Mi gato durmiendo la siesta'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);