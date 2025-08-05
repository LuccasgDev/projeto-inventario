import {Router} from "express"
import {
    listarDepartamentos,
    atualizarDepartamento,
    criarDepartamento,
    deletarDepartamento,
    detalharDepartamento
} from "../controllers/Departamento.js";

const router = Router();

router.get("/", listarDepartamentos);
router.post("/", criarDepartamento)
router.put("/:id", atualizarDepartamento)
router.get("/:id",detalharDepartamento)
router.delete("/:id",deletarDepartamento)

export default router;
