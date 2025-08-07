import {Router} from "express";
import {
    criarEquipamento,
    atualizarEquipamento,
    deletarEquipamento,
    detalharEquipamento,
    listarEquipamentos,
} from "../controllers/equipamentoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.get("/",listarEquipamentos)
router.post("/", criarEquipamento)
router.put("/:id", atualizarEquipamento)
router.get("/:id",detalharEquipamento)
router.delete("/:id",deletarEquipamento)
router.post('/equipamentos', authMiddleware, adminMiddleware, criarEquipamento);

export default router;