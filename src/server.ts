import express from 'express';
import despesasRoutes from './routes/despesas.routes';
import receitasRoutes from './routes/receitas.routes';
import relatoriosRoutes  from './routes/relatorios.routes';
console.log('📍 [server.ts] 🚀 Iniciando aplicação...\n');

console.log('📍 [server.ts] 📦 Importações carregadas');
console.log('   ✅ express');
console.log('   ✅ despesasRoutes');
console.log('   ✅ receitasRoutes');
console.log('   ✅ relatoriosRoutes\n');


const app = express();
console.log('📍 [server.ts] ✅ App Express criado\n');

const PORT = 3000;
console.log('📍 [server.ts] 🔧 Porta configurada:', PORT, '\n');

console.log('📍 [server.ts] 🔧 Configurando middlewares...');
app.use(express.json());
console.log('   ✅ express.json() ativado\n');
// Middleware de log ANTES das rotas

app.use((req, res, next) => {
    console.log('\n🌐 ========================================');
    console.log('📍 [server.ts] 📥 MIDDLEWARE: Nova requisição');
    console.log('   🔹 Método:', req.method);
    console.log('   🔹 URL:', req.url);
    console.log('   🔹 Body:', req.body);
    console.log('   🔹 Params:', req.params);
    console.log('========================================\n');
    next();
});

console.log('📍 [server.ts] ✅ Middleware de log configurado\n');
console.log('📍 [server.ts] 🛣️  Configurando rotas...');

app.get('/', (req,res)=>{
    console.log('📍 [server.ts] 🏠 Rota raiz "/" acessada');
    res.json({
        message: 'API Gastos v1.0',
        status: 'Rodando!',
        endpoints: {
            despesas: '/despesas',
            receitas: '/receitas',
            relatorios: '/relatorios'
        }
    });
});

console.log('   ✅ GET / registrada');

app.use('/despesas', despesasRoutes);
console.log('   ✅ /despesas registrado');
app.use('/receitas', receitasRoutes);
console.log('   ✅ /receitas registrado');
app.use('/relatorios', relatoriosRoutes);
console.log('   ✅ /relatorios registrado\n');
console.log('📍 [server.ts] 🎧 Iniciando servidor...');
app.listen(PORT, () => {
    console.log('\n✨ ========================================');
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log('✨ ========================================\n');
});