import {Despesa} from "../models/Transacao.js";
export class DespesaService{
    private despesas: Despesa[] = [];

    criar(descricao:string, valor:number, data:string, categoria:string): Despesa {
        if(!descricao){
            throw new Error ('Nao aceitamos despesa sem descricao')
        }
        if(typeof valor !== 'number'){
            throw new Error ('Favor entregar um valor numerico para o campo valor')
        }
        const despesa = new Despesa(descricao, valor, data, categoria)
        this.despesas.push(despesa);
        return despesa;

    }
    listarDespesas(): Despesa[] {
        return this.despesas;

    }
    buscarPorCategoria(categoria: string): Despesa[]{
        const filtroDespesa = this.despesas.filter(d => d.categoriaDespesa === categoria)
        return filtroDespesa;
    }
    calcularTotal(): number{
        const soma = this.despesas.reduce((total, valorTransacao)=> total + valorTransacao.valorTransacao, 0);
        return soma;
    }
    deletar (descricao:string): boolean{
        const index = this.despesas.findIndex((item)=> item.descricaoTransacao === descricao);
        if (index !== -1){
            this.despesas.splice(index, 1);
            return true
        }
        return false
    }
}