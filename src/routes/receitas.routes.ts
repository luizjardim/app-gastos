import { Router } from "express";
import { ReceitaController } from "../controllers/ReceitaController";

console.log('📍 [receitas.routes.ts] 🚀 Arquivo carregado!');

const router = Router();
console.log('📍 [receitas.routes.ts] ✅ Router criado');

console.log('📍 [receitas.routes.ts] 🏗️  Instanciando ReceitaController...');
const receitasRoutes = new ReceitaController();
console.log('📍 [receitas.routes.ts] ✅ Controller instanciado');

console.log('📍 [receitas.routes.ts] 🛣️  Registrando rotas...');

router.post('/', (req, res) => {
    console.log('📍 [receitas.routes.ts] 🔀 Rota POST / acionada');
    receitasRoutes.criar(req, res);
});
console.log('   ✅ POST / registrada');

router.get('/', (req, res) => {
    console.log('📍 [receitas.routes.ts] 🔀 Rota GET / acionada');
    receitasRoutes.listar(req, res);
});
console.log('   ✅ GET / registrada');

router.get('/calcular', (req, res) => {
    console.log('📍 [receitas.routes.ts] 🔀 Rota GET /calcular acionada');
    receitasRoutes.calcularTotal(req, res);
});
console.log('   ✅ GET /calcular registrada');

router.get('/:fonte', (req, res) => {
    console.log('📍 [receitas.routes.ts] 🔀 Rota GET /:fonte acionada');
    receitasRoutes.buscarPorFonte(req, res);
});
console.log('   ✅ GET /:fonte registrada');

router.delete('/:descricao', (req, res) => {
    console.log('📍 [receitas.routes.ts] 🔀 Rota DELETE /:descricao acionada');
    receitasRoutes.delete(req, res);
});
console.log('   ✅ DELETE /:descricao registrada');

console.log('📍 [receitas.routes.ts] ✅ Todas as rotas registradas!');
console.log('📍 [receitas.routes.ts] 📤 Exportando router\n');

export default router;