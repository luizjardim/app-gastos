import { Router } from "express";
import { ReceitaController } from "../controllers/ReceitaController";

const router = Router();
export const receitasRoutes = new ReceitaController();

router.post('/', (req, res)=>{
    receitasRoutes.criar(req,res)
});

router.get('/', (req, res)=>{
    receitasRoutes.listar(res);
});
router.get('/calcular', (req, res)=>{
    receitasRoutes.calcularTotal(req,res);
})
router.get('/:fonte', (req,res)=>{
    receitasRoutes.buscarPorFonte(req,res);
});
router.delete('/:descricao', (req,res)=>{
    receitasRoutes.delete(req,res);
});

export default router;