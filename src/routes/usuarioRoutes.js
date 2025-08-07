import express from 'express';
import {
    criarUsuario,
    listarUsuario,
    deletarUsuario,
    atualizarUsuario,
    detalharUsuario
} from "../controllers/usuarioController.js";
import authMiddleware, {adminMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", criarUsuario)
router.get("/", listarUsuario)
router.get("/:id", detalharUsuario)
router.put("/:id", atualizarUsuario)
router.delete("/:id",deletarUsuario)
router.post("/usuario", authMiddleware, adminMiddleware, criarUsuario)