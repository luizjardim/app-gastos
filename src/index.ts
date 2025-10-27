import { DespesaService } from './services/DespesaService.js';

console.log('=== TESTANDO SERVICES ===\n');

// Testa DespesaService
const despesaService = new DespesaService();

const d1 = despesaService.criar('Almoço', 45.50, '2025-10-26', 'Alimentação');
const d2 = despesaService.criar('Uber', 25, '2025-10-26', 'Transporte');
const d3 = despesaService.criar('Cinema', 40, '2025-10-26', 'Lazer');

console.log('Todas as despesas:');
console.log(despesaService.listarDespesas().map(d => d.exibir()));


console.log('\nDespesas de Alimentação:');
console.log(despesaService.buscarPorCategoria('Alimentação').map(d => d.exibir()));

/*
console.log(`\nTotal de despesas: R$ ${despesaService.calcularTotal().toFixed(2)}`);

// Testa ReceitaService
const receitaService = new ReceitaService();

const r1 = receitaService.criar('Salário', 5000, '2025-10-01', 'Trabalho');
const r2 = receitaService.criar('Freelance', 800, '2025-10-15', 'Extra');

console.log('\n\nTodas as receitas:');
console.log(receitaService.listarTodas().map(r => r.exibir()));

console.log(`\nTotal de receitas: R$ ${receitaService.calcularTotal().toFixed(2)}`);

// Teste de deleção
console.log('\n\nDeletando "Uber"...');
const deletou = despesaService.deletar('Uber');
console.log(`Deletou: ${deletou}`);
console.log('Despesas restantes:', despesaService.listarTodas().length);
*/