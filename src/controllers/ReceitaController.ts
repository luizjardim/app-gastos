import { Request, Response } from "express";
import { ReceitaService } from "../services/ReceitaService";

export class ReceitaController{
    private receitaService: ReceitaService; 

    constructor (){
        this.receitaService = ReceitaService.getInstance();
    }
    criar(req:Request, res:Response){
        const {descricao, valor, data, fonte} = req.body;
        if (!descricao || !valor || !data || !fonte){
            return res.status(400).json({
                erro: "Os campos: descricao, valor, data e fonte sao obrigatorios"
            });
        }
        if(typeof valor !== 'number'){
            return res.status(400).json({
                erro: "O campo valor deve ser numerico"
            })
        }
        try {
            const novaReceita = this.receitaService.criar(descricao, valor, data, fonte)
            return res.status(201).json({
                message: 'Receita criada com sucesso',
                receita: {
                    descricao: novaReceita.descricaoTransacao,
                    valor: novaReceita.valorTransacao,
                    data: novaReceita.dataTransacao,
                    fonte: novaReceita.fonteReceita
                }
            })
        } catch (error: any) {
            return res.status(400).json({
                erro: error.message
            });
        }
    }
    listar (res:Response){
        const receitas = this.receitaService.listarReceitas();
        return res.status(200).json(receitas.map(receita=>({
            descricao: receita.descricaoTransacao,
            valor: receita.valorTransacao,
            data: receita.dataTransacao,
            fonte: receita.fonteReceita
        })))
    }
    buscarPorFonte(req:Request, res:Response){
        
        const fonte= req.params.fonte
        console.log(fonte);
        if(!fonte){
            return res.status(400).json({
                erro: "Esperado um atributo fonte para busca nada recebido"
            })
        }
        const itemBuscado = this.receitaService.buscarPorFonte(fonte)
        return res.status(200).json(itemBuscado.map(receita=>({
            descricao: receita.descricaoTransacao,
            valor: receita.valorTransacao,
            data: receita.dataTransacao,
            fonte: receita.fonteReceita
        })))
        
    } 
    calcularTotal(req:Request, res:Response){
        //Como faria para mandar uma mensagem no app dizendo que nao tem receitas cadastradas e portanto essa funcao nao vai executar nada? 
        const receitas = this.receitaService.listarReceitas();
        if(receitas.length === 0){
            return res.status(404).json({
                mensagem: "Nenhuma receita cadastrada",
                total: 0
            })
        }
        const totalCaculadoReceitas = this.receitaService.calcularTotal();
        console.log(totalCaculadoReceitas)
        return res.status(200).json({
            message: `Total calculado de receitas: R$ ${totalCaculadoReceitas}`
        })
    }
    delete(req:Request, res:Response){
        const descricao = req.params.descricao
        if(!descricao){
            return res.status(400).json({
                erro: 'Parametro descricao faltante'
            })
        }
        const validaDelete = this.receitaService.deletar(descricao);
        if(!validaDelete){
            return res.status(404).json({
                erro: `Nao foi possivel encontrar uma receita com essa descricao: ${descricao}`
            })
        }
        return res.status(200).json({
            message: `Receita com descricao: ${descricao} deletada com sucesso`
        })

    }
}