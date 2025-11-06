import express from 'express';
import despesasRoutes from './routes/despesas.routes';
import receitasRoutes from './routes/receitas.routes';
const app = express();
const PORT = 3000;

app.use(express.json());
// Middleware de log ANTES das rotas

app.use((req, res, next) => {
    console.log("📥 Requisição:", req.method, req.url);
    console.log("📦 Body:", req.body);
    console.log("📦 ID Param:", req.params.descricao);
    next();
});

app.get('/', (req,res)=>{
    res.json({
        message: 'API Gastos v1.0',
        status: 'Rodando!',
        endpoints: {
            despesas: '/despesas',
            receitas: '/receitas'
        }
    });
});

// Depois as rotas

app.use('/despesas', despesasRoutes);
app.use('/receitas', receitasRoutes);
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});