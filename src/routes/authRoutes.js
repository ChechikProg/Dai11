// =========================================================
// routes/authRoutes.js
// Define los endpoints de autenticación (públicos).
// =========================================================

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { validarRegistro, validarLogin } = require('../middlewares/validationMiddleware');

// POST /api/auth/register -> Registro de nuevas cuentas
router.post('/register',
  // #swagger.tags = ['Autenticación']
  // #swagger.summary = 'Registrar un nuevo usuario'
  // #swagger.description = 'Crea una cuenta nueva. Valida que el email y el nombre de usuario no estén ya registrados, y guarda la contraseña encriptada con bcrypt.'
  /* #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/RegistroUsuario' }
  } */
  validarRegistro, authController.register);

// POST /api/auth/login -> Validación de identidad y entrega del token JWT
router.post('/login',
  // #swagger.tags = ['Autenticación']
  // #swagger.summary = 'Iniciar sesión'
  // #swagger.description = 'Valida email y contraseña. Si son correctos, devuelve un token JWT que debe enviarse en el header Authorization de las rutas protegidas, como "Bearer <token>".'
  /* #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/LoginUsuario' }
  } */
  validarLogin, authController.login);

module.exports = router;
