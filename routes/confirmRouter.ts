import express from 'express';
import { confirmMeasure } from '../controllers/confirmController'; // Importa a função corretamente

const router = express.Router();

router.patch('/', confirmMeasure); // Usa a função importada corretamente

export default router;
