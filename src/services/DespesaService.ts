import {Despesa} from "../models/Transacao.js";
export class DespesaService{
    private despesa: Despesa[] = [];

    criar(descricao:string, valor:number, data:string, categoria:string): Despesa {
        if(!descricao){
            throw new Error ('Nao aceitamos despesa sem descricao')
        }
        if(typeof valor !== 'number'){
            throw new Error ('Favor entregar um valor numerico para o campo valor')
        }
        const despesa = new Despesa(descricao, valor, data, categoria)
        this.despesa.push(despesa);
        return despesa;

    }
    listarDespesas(): Despesa[] {
        return this.despesa;

    }
    buscarPorCategoria(categoria: string): Despesa[]{
        const filtroDespesa = this.despesa.filter(d => d.categoriaDespesa === categoria)
        return filtroDespesa;
    }
    calcularTotal(){

    }
    deletar (){

    }
}