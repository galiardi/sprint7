import { Router } from 'express';
import {
  crearUsuario,
  obtenerTodosUsuarios,
  actualizarUsuario,
  borrarUsuario,
} from '../controllers/usuario.controller.js';
import {
  crearTransferencia,
  obtenerTodasTransferencias,
} from '../controllers/transferencia.controller.js';

const router = Router();

// usuarios
router.post('/usuario', crearUsuario);
router.get('/usuarios', obtenerTodosUsuarios);
router.put('/usuario', actualizarUsuario);
router.delete('/usuario', borrarUsuario);

// transferencias
router.post('/transferencia', crearTransferencia);
router.get('/transferencias', obtenerTodasTransferencias);

export default router;
