import express  from "express";
import {
    criarSubstituicao,
    atualizarSubstituicao,
    deletarSubstituicao,
    detalhesSubstituicao,
    listarSubstituicao
} from "../controllers/substituicaoController.js";
import authMiddleware, {adminMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/",criarSubstituicao)
router.get("/", listarSubstituicao)
router.get("/:id",detalhesSubstituicao)
router.put("/:id", atualizarSubstituicao)
router.delete("/:id",deletarSubstituicao)
router.post("/equipamentos", authMiddleware, adminMiddleware, criarSubstituicao)