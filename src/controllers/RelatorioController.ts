import { Request, Response } from "express";
import { DespesaService } from "../services/DespesaService";
import { ReceitaService } from "../services/ReceitaService";

export class RelatorioController {
    private despesaService: DespesaService;
    private receitaService: ReceitaService;

    constructor(){
        this.despesaService = DespesaService.getInstance();
        this.receitaService = ReceitaService.getInstance();
        console.log(`RelatorioController.ts`,this.despesaService);
        console.log(`RelatorioController.ts`,this.receitaService)
    }

    calcularSaldo(req:Request, res:Response){
        const totalReceita = this.receitaService.calcularTotal();
        const totalDespesa = this.despesaService.calcularTotal();
        console.log(totalDespesa);//Testes
        console.log(totalReceita);//Testes
        const saldoCalculado = totalReceita + totalDespesa
        console.log(saldoCalculado);//Testes
        return res.status(200).json({
            receitas: totalReceita,
            despesas: totalDespesa,
            saldo: `Seu saldo é de R$: ${saldoCalculado.toFixed(2)}`
        })
    }
}