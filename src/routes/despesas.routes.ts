import { Router } from "express";
import { DespesaController } from "../controllers/DespesaControllers";

const router = Router();
const despesasRoutes= new DespesaController();

router.post('/', (req, res)=> {
    despesasRoutes.criar(req,res)
});

router.get('/', (req, res)=> {
    despesasRoutes.listar(req,res)
});

router.delete('/:descricao', (req, res)=> {
    despesasRoutes.deletar(req,res)
});
export default router;
