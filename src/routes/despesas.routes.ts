import { Router } from "express";
import { DespesaController } from "../controllers/DespesaControllers";

console.log('📍 [despesas.routes.ts] 🚀 Arquivo carregado!');
const router = Router();
console.log('📍 [despesas.routes.ts] ✅ Router criado');

console.log('📍 [despesas.routes.ts] 🏗️  Instanciando DespesaController...');
const despesasRoutes= new DespesaController();
console.log('📍 [despesas.routes.ts] ✅ Controller instanciado');

console.log('📍 [despesas.routes.ts] 🛣️  Registrando rotas...');

router.post('/', (req, res)=> {
    console.log('📍 [despesas.routes.ts] 🔀 Rota POST / acionada');
    despesasRoutes.criar(req,res)
});
console.log('   ✅ POST / registrada');

router.get('/', (req, res)=> {
    console.log('📍 [despesas.routes.ts] 🔀 Rota GET / acionada');
    despesasRoutes.listar(req,res)
});
console.log('   ✅ GET / registrada');

router.delete('/:descricao', (req, res)=> {
    console.log('📍 [despesas.routes.ts] 🔀 Rota DELETE /:descricao acionada');
    despesasRoutes.deletar(req,res)
});
console.log('   ✅ DELETE /:descricao registrada');

console.log('📍 [despesas.routes.ts] ✅ Todas as rotas registradas!');
console.log('📍 [despesas.routes.ts] 📤 Exportando router\n');
export default router;
