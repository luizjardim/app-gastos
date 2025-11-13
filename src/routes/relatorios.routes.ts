import { Router } from "express";
import { RelatorioController } from "../controllers/RelatorioController";

console.log('📍 [relatorios.routes.ts] 🚀 Arquivo carregado!');

const router = Router();
console.log('📍 [relatorios.routes.ts] ✅ Router criado');

console.log('📍 [relatorios.routes.ts] 🏗️  Instanciando RelatorioController...');
const relatoriosRoutes = new RelatorioController();
console.log('📍 [relatorios.routes.ts] ✅ Controller instanciado');

console.log('📍 [relatorios.routes.ts] 🛣️  Registrando rotas...');

router.get('/saldo', (req, res) => {
    console.log('📍 [relatorios.routes.ts] 🔀 Rota GET /saldo acionada');
    relatoriosRoutes.calcularSaldo(req, res);
});
console.log('   ✅ GET /saldo registrada');

console.log('📍 [relatorios.routes.ts] ✅ Todas as rotas registradas!');
console.log('📍 [relatorios.routes.ts] 📤 Exportando router\n');

export default router;