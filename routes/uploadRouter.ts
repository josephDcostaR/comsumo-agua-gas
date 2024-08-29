import { uploadMeasure } from './../controllers/uploadController';
import express from 'express';


const router = express.Router();

router.patch('/',  uploadMeasure); // Usa a função importada corretamente

export default router;
