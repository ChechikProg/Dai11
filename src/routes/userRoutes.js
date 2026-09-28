// =========================================================
// routes/userRoutes.js
// Define los endpoints relacionados al usuario/perfil.
// Ambos endpoints son PROTEGIDOS: requieren un token válido.
// =========================================================

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const verificarToken = require('../middlewares/authMiddleware');

// GET /api/usuarios/perfil -> Devuelve el perfil del usuario autenticado
router.get('/perfil',
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Obtener mi perfil'
  // #swagger.description = 'Devuelve los datos del perfil del usuario autenticado (según el token) junto con sus publicaciones.'
  verificarToken, userController.obtenerPerfil);

// PUT /api/usuarios/perfil -> Edita biografía, nombre completo o foto
router.put('/perfil',
  // #swagger.tags = ['Usuarios']
  // #swagger.summary = 'Editar mi perfil'
  // #swagger.description = 'Actualiza nombre completo, biografía y/o foto de perfil del usuario autenticado. Los campos que no se envíen mantienen su valor actual.'
  /* #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/ActualizarPerfil' }
  } */
  verificarToken, userController.actualizarPerfil);

module.exports = router;
