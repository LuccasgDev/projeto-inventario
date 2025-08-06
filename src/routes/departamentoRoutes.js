import {Router} from "express"
import {
    listarDepartamentos,
    atualizarDepartamento,
    criarDepartamento,
    deletarDepartamento,
    detalharDepartamento
} from "../controllers/departamentoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
router.get("/", listarDepartamentos);
router.post("/", criarDepartamento)
router.put("/:id", atualizarDepartamento)
router.get("/:id",detalharDepartamento)
router.delete("/:id",deletarDepartamento)
router.post('/equipamentos', authMiddleware, adminMiddleware, criarEquipamento);

export default router;
