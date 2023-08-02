import { Router } from 'express';
import {
  crearUsuario,
  obtenerTodosUsuarios,
  actualizarUsuario,
  borrarUsuario,
} from '../controllers/usuarios.controller.js';

const router = Router();

router.post('/', crearUsuario);
router.get('/', obtenerTodosUsuarios);
router.put('/', actualizarUsuario);
router.delete('/', borrarUsuario);

export default router;
