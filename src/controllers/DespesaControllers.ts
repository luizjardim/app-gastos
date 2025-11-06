import { DespesaService } from "../services/DespesaService";
import { Request, Response } from 'express';


export class DespesaController {
    private despesaService: DespesaService;

    constructor() {
        this.despesaService = new DespesaService();
    }

    criar(req: Request, res: Response) {
        const { descricao, valor, data, categoria } = req.body;
        if (!descricao || !valor || !data || !categoria) {
            return res.status(400).json({ erro: 'Os campos: descriçao, valor, data, categoria sao obrigatorios' })
        }
        if (typeof (valor) !== 'number') {
            return res.status(400).json({ erro: 'O campo valor nao esta como um tipo numerico' })
        }
        try {
            const novaDespesa = this.despesaService.criar(descricao, valor, data, categoria);
            return res.status(201).json({
                mensagem: 'Despesa criada com sucesso',
                despesa: {
                    descricao: novaDespesa.descricaoTransacao,
                    valor: novaDespesa.valorTransacao,
                    data: novaDespesa.dataTransacao,
                    categoria: novaDespesa.categoriaDespesa
                }
            })
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }

        // O que vai aqui?
    }
    listar(req: Request, res: Response) {

        const despesas = this.despesaService.listarDespesas();
        return res.status(200).json(despesas.map(despesa => ({
            descricao: despesa.descricaoTransacao,
            valor: despesa.valorTransacao,
            data: despesa.dataTransacao,
            categoria: despesa.categoriaDespesa
        })));

    }
    deletar(req: Request, res: Response){
        const descricao =  req.params.descricao;
        console.log(descricao)
        if(!descricao){
            return res.status(400).json({
                Erro: "Parametro descriçao é fundamental para realizar o delete"
            })
        }
        
        const validDeletion = this.despesaService.deletar(descricao);
        if (validDeletion){
            return res.status(200).json({
                message: `Despesa "${descricao}" deletada com sucesso`
            })
        }else{
            return res.status(404).json({
                message: `Nao foi possivel encontrar despesa com a descricao: ${descricao}`
            })
        }
        

    }
}