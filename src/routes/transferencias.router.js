import { Router } from 'express';
import {
  crearTransferencia,
  obtenerTodasTransferencias,
} from '../controllers/transferencias.controller.js';

const router = Router();

router.post('/', crearTransferencia);
router.get('/', obtenerTodasTransferencias);

export default router;
