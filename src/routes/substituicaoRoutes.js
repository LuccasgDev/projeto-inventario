import express  from "express";
import {
    criarSubstituicao,
    atualizarSubstituicao,
    deletarSubstituicao,
    detalhesSubstituicao,
    listarSubstituicao
} from "../controllers/substituicaoController.js";


const router = express.Router();

router.post("/",criarSubstituicao)
router.get("/", listarSubstituicao)
router.get("/:id",detalhesSubstituicao)
router.put("/:id", atualizarSubstituicao)
router.delete("/:id",deletarSubstituicao)
export default router;