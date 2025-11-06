import { Receita } from "../models/Transacao";
export class ReceitaService {
    private receitas: Receita[] = [];

    criar(descricao:string, valor:number, data:string, fonte:string): Receita {
        const receita = new Receita(descricao, valor, data, fonte);
        this.receitas.push(receita);
        return receita;
    }
    listarReceitas(): Receita[]{
        return this.receitas
    }
    buscarPorFonte(fonte:string): Receita[]{
        const filtrarFonte = this.receitas.filter(item=> item.fonteReceita === fonte);
        return filtrarFonte;
    }
    calcularTotal():number{
        const somaReceitas = this.receitas.reduce((total, receita)=> total + receita.valorTransacao, 0)
        return somaReceitas;
    }   
    deletar(descricao:string):boolean{
        const index = this.receitas.findIndex((item)=> item.descricaoTransacao === descricao);
        //console.log(this.receitas[index])
        if (index !== -1){
            this.receitas.splice(index, 1);
            return true;
        }
        return false;
    }
}