import { Router } from 'express';
import {gerarRelatorio} from "../controllers/relatorioController.js";

const router = Router();

router.get('/substituicoes', gerarRelatorio);

export default router;