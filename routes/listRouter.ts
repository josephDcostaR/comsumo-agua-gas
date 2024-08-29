import { listMeasures } from './../controllers/listController';
import express from 'express';
// Importa a função corretamente

const router = express.Router();

router.patch('/', listMeasures); // Usa a função importada corretamente

export default router;
