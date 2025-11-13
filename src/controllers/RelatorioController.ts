import { Request, Response } from "express";
import { DespesaService } from "../services/DespesaService";
import { ReceitaService } from "../services/ReceitaService";

export class RelatorioController {
    private despesaService: DespesaService;
    private receitaService: ReceitaService;

    constructor(){
        console.log('📍 [RelatorioController.ts] 🏗️  Constructor chamado');
        
        console.log('   ✨ Chamando DespesaService.getInstance()...');
        this.despesaService = DespesaService.getInstance();
        console.log('   ✅ DespesaService atribuído');
        
        console.log('   ✨ Chamando ReceitaService.getInstance()...');
        this.receitaService = ReceitaService.getInstance();
        console.log('   ✅ ReceitaService atribuído');
        
        console.log('   📦 Services carregados:', {
            despesaService: this.despesaService,
            receitaService: this.receitaService
        });
    }

    calcularSaldo(req:Request, res:Response){
        console.log('\n========================================');
        console.log('📍 [RelatorioController.ts] 📊 Método calcularSaldo() chamado');
        
        console.log('   💰 Calculando total de receitas...');
        const totalReceita = this.receitaService.calcularTotal();
        console.log('   ✅ Total receitas:', totalReceita);
        
        console.log('   💸 Calculando total de despesas...');
        const totalDespesa = this.despesaService.calcularTotal();
        console.log('   ✅ Total despesas:', totalDespesa);
        
        console.log('   🧮 Calculando saldo...');
        console.log('      Fórmula: receitas + despesas');
        console.log('      Cálculo:', totalReceita, '+', totalDespesa);
        const saldoCalculado = totalReceita + totalDespesa;
        console.log('   ✅ Saldo:', saldoCalculado);
        
        console.log('   🎨 Determinando status...');
        const status = saldoCalculado >= 0 ? "Positivo ✅" : "Negativo ⚠️";
        console.log('   📊 Status:', status);
        
        console.log('   📦 Montando resposta...');
        const resposta = {
            receitas: totalReceita,
            despesas: totalDespesa,
            saldo: saldoCalculado,
            status: status,
            detalhes: {
                receitasFormatado: `R$ ${totalReceita.toFixed(2)}`,
                despesasFormatado: `R$ ${totalDespesa.toFixed(2)}`,
                saldoFormatado: `R$ ${saldoCalculado.toFixed(2)}`
            }
        };
        
        console.log('   📤 Enviando resposta 200:', resposta);
        console.log('========================================\n');
        return res.status(200).json(resposta);
    }
}