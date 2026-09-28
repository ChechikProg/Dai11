// =========================================================
// routes/postRoutes.js
// Define los endpoints de publicaciones.
// GET es público (feed), POST y DELETE son protegidos.
// =========================================================

const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const verificarToken = require('../middlewares/authMiddleware');
const { validarPublicacion } = require('../middlewares/validationMiddleware');

// GET /api/publicaciones -> Feed público con todas las publicaciones
router.get('/',
  // #swagger.tags = ['Publicaciones']
  // #swagger.summary = 'Obtener el feed'
  // #swagger.description = 'Devuelve todas las publicaciones existentes, ordenadas de la más reciente a la más antigua, incluyendo el nombre de usuario y la foto de perfil del autor de cada una.'
  postController.obtenerFeed);

// POST /api/publicaciones -> Crear publicación (requiere estar logueado)
router.post('/',
  // #swagger.tags = ['Publicaciones']
  // #swagger.summary = 'Crear una publicación'
  // #swagger.description = 'Crea una nueva publicación asociada al usuario autenticado. El autor se toma del token, no del body.'
  /* #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/NuevaPublicacion' }
  } */
  verificarToken, validarPublicacion, postController.crearPublicacion);

// DELETE /api/publicaciones/:id -> Eliminar una publicación propia
router.delete('/:id',
  // #swagger.tags = ['Publicaciones']
  // #swagger.summary = 'Eliminar una publicación propia'
  // #swagger.description = 'Elimina una publicación por id. Solo puede borrarla el usuario dueño de esa publicación.'
  /* #swagger.parameters['id'] = {
       in: 'path',
       description: 'Id de la publicación a eliminar',
       required: true,
       type: 'integer'
  } */
  verificarToken, postController.eliminarPublicacion);

module.exports = router;
