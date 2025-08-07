import { Router } from 'express';
import {
    criarComponente,
    listarComponente,
    detalharComponente,
    atualizarComponente,
    deletarComponente
} from '../controllers/componenteController.js';

const router = Router();

// Rota POST: Criar um novo componente
router.post('/', criarComponente);

// Rota GET: Listar todos os componentes
router.get('/', listarComponente);

// Rota GET: Obter detalhes de um componente específico
router.get('/:id', detalharComponente);

// Rota PUT: Atualizar um componente existente
router.put('/:id', atualizarComponente);

// Rota DELETE: Excluir um componente
router.delete('/:id', deletarComponente);

export default router;