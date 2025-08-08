import express from "express";
import {
    criarEquipamento,
    atualizarEquipamento,
    deletarEquipamento,
    detalharEquipamento,
    listarEquipamentos,
} from "../controllers/equipamentoController.js";


const router = express.Router();

router.get("/",listarEquipamentos)
router.post("/", criarEquipamento)
router.put("/:id", atualizarEquipamento)
router.get("/:id",detalharEquipamento)
router.delete("/:id",deletarEquipamento)

export default router;