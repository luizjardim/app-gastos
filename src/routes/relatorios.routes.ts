import { Router } from "express";
import { RelatorioController } from "../controllers/RelatorioController";

const router = Router();
export const relatoriosRoutes = new RelatorioController();

router.get('/saldo', (req, res)=>{
    relatoriosRoutes.calcularSaldo(req, res);
});

export default router;