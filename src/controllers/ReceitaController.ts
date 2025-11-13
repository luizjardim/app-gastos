import { Request, Response } from "express";
import { ReceitaService } from "../services/ReceitaService";

export class ReceitaController{
    private receitaService: ReceitaService; 

    constructor (){
        console.log('📍 [ReceitaController.ts] 🏗️  Constructor chamado');
        console.log('   ✨ Chamando ReceitaService.getInstance()...');
        this.receitaService = ReceitaService.getInstance();
        console.log('   ✅ Service atribuído:', this.receitaService);
    }
    criar(req:Request, res:Response){
        console.log('\n========================================');
        console.log('📍 [ReceitaController.ts] ➕ Método criar() chamado');
        console.log('   📥 req.body:', req.body);
        const {descricao, valor, data, fonte} = req.body;
        
        console.log('   📦 Dados extraídos:', { descricao, valor, data, fonte });
        //Validacoes
        console.log('   🔍 Validando campos obrigatórios...');
        if (!descricao || !valor || !data || !fonte){
            console.log('   ❌ Validação falhou! Campos faltando');
            return res.status(400).json({
                erro: "Os campos: descricao, valor, data e fonte sao obrigatorios"
            });
        }
        console.log('   ✅ Campos obrigatórios OK');
        console.log('   🔍 Validando tipo do valor...');
        if(typeof valor !== 'number'){
            console.log('   ❌ Validação falhou! Valor não é number, é:', typeof(valor));
            return res.status(400).json({
                erro: "O campo valor deve ser numerico"
            })
        }
        console.log('   ✅ Tipo do valor OK');
        try {
            console.log('   ➕ Chamando service.criar()...');
            const novaReceita = this.receitaService.criar(descricao, valor, data, fonte)
            console.log('   ✅ Receita criada no service!');
            console.log('   📦 Montando resposta...');
            
            const resposta = {
                message: 'Receita criada com sucesso',
                receita: {
                    descricao: novaReceita.descricaoTransacao,
                    valor: novaReceita.valorTransacao,
                    data: novaReceita.dataTransacao,
                    fonte: novaReceita.fonteReceita
                }
            };
            console.log('   📤 Enviando resposta 201:', resposta);
            console.log('========================================\n');

            return res.status(201).json(resposta);

        } catch (error: any) {
            console.log('   ❌ ERRO capturado:', error.message);
            console.log('========================================\n');
            return res.status(400).json({
                erro: error.message
            });
        }
    }
    listar (req:Request, res:Response){
        console.log('\n========================================');
        console.log('📍 [ReceitaController.ts] 📋 Método listar() chamado');
        
        console.log('   📋 Chamando service.listarReceitas()...');
        const receitas = this.receitaService.listarReceitas();
        
        console.log('   ✅ Receitas recebidas:', receitas.length);
        console.log('   🔄 Mapeando para resposta...');

        const resposta = receitas.map((receita, index) => {
            console.log(`      🔄 [${index}] Mapeando:`, receita);
            return {
                descricao: receita.descricaoTransacao,
                valor: receita.valorTransacao,
                data: receita.dataTransacao,
                fonte: receita.fonteReceita
            };
        });
        
        console.log('   ✅ Mapeamento completo!');
        console.log('   📤 Enviando resposta 200:', resposta);
        console.log('========================================\n');
        return res.status(200).json(resposta);
        
    }
    buscarPorFonte(req:Request, res:Response){
        console.log('\n========================================');
        console.log('📍 [ReceitaController.ts] 🔍 Método buscarPorFonte() chamado');
        
        const fonte= req.params.fonte
        console.log('   📥 Parâmetro fonte:', fonte);

        
        if(!fonte){
            return res.status(400).json({
                erro: "Esperado um atributo fonte para busca nada recebido"
            })
        }
        console.log('   🔍 Chamando service.buscarPorFonte()...');
        const itemBuscado = this.receitaService.buscarPorFonte(fonte);
        console.log('   ✅ Busca completa! Encontradas:', itemBuscado.length);
        console.log('   🔄 Mapeando para resposta...');
        
        const resposta = itemBuscado.map((receita, index) => {
            console.log(`      🔄 [${index}] Mapeando:`, receita);
            return {
                descricao: receita.descricaoTransacao,
                valor: receita.valorTransacao,
                data: receita.dataTransacao,
                fonte: receita.fonteReceita
            };
        });
        
        console.log('   📤 Enviando resposta 200:', resposta);
        console.log('========================================\n');
        return res.status(200).json(resposta);
    } 
    calcularTotal(req:Request, res:Response){
        //Como faria para mandar uma mensagem no app dizendo que nao tem receitas cadastradas e portanto essa funcao nao vai executar nada? 
        console.log('\n========================================');
        console.log('📍 [ReceitaController.ts] 📊 Método calcularTotal() chamado');
        
        console.log('   📋 Chamando service.listarReceitas() para validar...');
        const receitas = this.receitaService.listarReceitas();
        console.log('   📊 Total de receitas:', receitas.length);
        
        if (receitas.length === 0) {
            console.log('   ⚠️  Nenhuma receita cadastrada!');
            const resposta = {
                mensagem: "Nenhuma receita cadastrada",
                total: 0
            };
            console.log('   📤 Enviando resposta 404:', resposta);
            console.log('========================================\n');
            return res.status(404).json(resposta);
        }
        
        console.log('   📊 Chamando service.calcularTotal()...');
        const totalCalculadoReceitas = this.receitaService.calcularTotal();
        
        console.log('   ✅ Total calculado:', totalCalculadoReceitas);
        const resposta = {
            message: `Total calculado de receitas: R$ ${totalCalculadoReceitas}`
        };
        
        console.log('   📤 Enviando resposta 200:', resposta);
        console.log('========================================\n');
        return res.status(200).json(resposta);
    }
    delete(req:Request, res:Response){
        console.log('\n========================================');
        console.log('📍 [ReceitaController.ts] 🗑️  Método delete() chamado');
        
        const descricao = req.params.descricao;
        console.log('   📥 Parâmetro descricao:', descricao);
        
        console.log('   🗑️  Chamando service.deletar()...');
        const validaDelete = this.receitaService.deletar(descricao);
        
        console.log('   📤 Resultado do service:', validaDelete);
        
        if (!validaDelete) {
            console.log('   ❌ Não encontrado!');
            const resposta = {
                erro: `Nao foi possivel encontrar uma receita com essa descricao: ${descricao}`
            };
            console.log('   📤 Enviando resposta 404:', resposta);
            console.log('========================================\n');
            return res.status(404).json(resposta);
        }
        
        console.log('   ✅ Deletado com sucesso!');
        const resposta = {
            message: `Receita com descricao: ${descricao} deletada com sucesso`
        };
        console.log('   📤 Enviando resposta 200:', resposta);
        console.log('========================================\n');
        return res.status(200).json(resposta);

    }
}