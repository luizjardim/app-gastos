import { DespesaService } from "../services/DespesaService";
import { Request, Response } from 'express';


export class DespesaController {
    private despesaService: DespesaService;

    constructor() {
        console.log('📍 [DespesaController.ts] 🏗️  Constructor chamado');
        console.log('   ✨ Chamando DespesaService.getInstance()...');
        this.despesaService = DespesaService.getInstance();
        console.log('   ✅ Service atribuído:', this.despesaService);
    }

    criar(req: Request, res: Response) {
        console.log('\n========================================');
        console.log('📍 [DespesaController.ts] ➕ Método criar() chamado');
        console.log('   📥 req.body:', req.body);
        const { descricao, valor, data, categoria } = req.body;
        console.log('   📦 Dados extraídos:', { descricao, valor, data, categoria });
        // Validações
        console.log('   🔍 Validando campos obrigatórios...');
        if (!descricao || !valor || !data || !categoria) {
            console.log('   ❌ Validação falhou! Campos faltando');
            return res.status(400).json({ erro: 'Os campos: descriçao, valor, data, categoria sao obrigatorios' })
        }
        console.log('   ✅ Campos obrigatórios OK');
        console.log('   🔍 Validando tipo do valor...');
        if (typeof (valor) !== 'number') {
            console.log('   ❌ Validação falhou! Valor não é number, é:', typeof(valor));
            return res.status(400).json({ erro: 'O campo valor nao esta como um tipo numerico' })
        }
        console.log('   ✅ Tipo do valor OK');
        try {
            console.log('   ➕ Chamando service.criar()...');
            const novaDespesa = this.despesaService.criar(descricao, valor, data, categoria);
            console.log('   ✅ Despesa criada no service!');
            console.log('   📦 Montando resposta...');
            
            const resposta = {
                mensagem: 'Despesa criada com sucesso',
                despesa: {
                    descricao: novaDespesa.descricaoTransacao,
                    valor: novaDespesa.valorTransacao,
                    data: novaDespesa.dataTransacao,
                    categoria: novaDespesa.categoriaDespesa
                }
            };
            
            console.log('   📤 Enviando resposta 201:', resposta);
            console.log('========================================\n');
            return res.status(201).json(resposta);
        } catch (error: any) {
            console.log('   ❌ ERRO capturado:', error.message);
            console.log('========================================\n');
            return res.status(400).json({ erro: error.message });
        }

        // O que vai aqui?
    }
    listar(req: Request, res: Response) {
        console.log('\n========================================');
        console.log('📍 [DespesaController.ts] 📋 Método listar() chamado');
        
        console.log('   📋 Chamando service.listarDespesas()...');

        const despesas = this.despesaService.listarDespesas();
        console.log('   ✅ Despesas recebidas:', despesas.length);
        console.log('   🔄 Mapeando para resposta...');
        const resposta = despesas.map((despesa, index) => {
            console.log(`      🔄 [${index}] Mapeando:`, despesa);
            return {
                descricao: despesa.descricaoTransacao,
                valor: despesa.valorTransacao,
                data: despesa.dataTransacao,
                categoria: despesa.categoriaDespesa
            };
        });
        
        console.log('   ✅ Mapeamento completo!');
        console.log('   📤 Enviando resposta 200:', resposta);
        console.log('========================================\n');
        return res.status(200).json(resposta);
        

    }
    deletar(req: Request, res: Response){
        console.log('\n========================================');
        console.log('📍 [DespesaController.ts] 🗑️  Método deletar() chamado');
        const descricao =  req.params.descricao;
        console.log('   📥 Parâmetro descricao:', descricao);
        if(!descricao){
            return res.status(400).json({
                Erro: "Parametro descriçao é fundamental para realizar o delete"
            })
        }
        console.log('   🗑️  Chamando service.deletar()...');
        const validDeletion = this.despesaService.deletar(descricao);
        console.log('   📤 Resultado do service:', validDeletion);
         if (validDeletion) {
            console.log('   ✅ Deletado com sucesso!');
            const resposta = { message: `Despesa "${descricao}" deletada com sucesso` };
            console.log('   📤 Enviando resposta 200:', resposta);
            console.log('========================================\n');
            return res.status(200).json(resposta);
        } else {
            console.log('   ❌ Não encontrado!');
            const resposta = { message: `Nao foi possivel encontrar despesa com a descricao: ${descricao}` };
            console.log('   📤 Enviando resposta 404:', resposta);
            console.log('========================================\n');
            return res.status(404).json(resposta);
        }
        

    }
}