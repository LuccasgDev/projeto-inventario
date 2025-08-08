// src/routes/departamentoRoutes.js
import express from "express";
import {
    listarDepartamentos,
    atualizarDepartamento,
    criarDepartamento,
    deletarDepartamento,
    detalharDepartamento
} from "../controllers/departamentoController.js";
import { criarEquipamento } from "../controllers/equipamentoController.js"; // <-- IMPORTA AQUI
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", listarDepartamentos);
router.post("/", criarDepartamento);

// Rota para criar equipamento dentro de um departamento (usa :id do departamento)
router.post("/:id/equipamentos", authMiddleware, criarEquipamento);

router.put("/:id", atualizarDepartamento);
router.get("/:id", detalharDepartamento);
router.delete("/:id", deletarDepartamento);

export default router;
