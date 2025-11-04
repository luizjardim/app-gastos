import { Router } from "express";
import { DespesaController } from "../controllers/DespesaControllers";

const router = Router();
const despesasRoutes= new DespesaController();

router.post('/', (req, res)=> {
    despesasRoutes.criar(req,res)
});

export default router; despesasRoutes;
