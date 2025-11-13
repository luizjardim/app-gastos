import { Receita } from "../models/Transacao";
export class ReceitaService {
    private static instance : ReceitaService;
    private receitas: Receita[] = [];
    private constructor(){
        console.log('📍 [Receita Service.ts] 🏗️  Constructor PRIVADO chamado');
        console.log('   📦 Array de receitas inicializado (vazio):', this.receitas);
    }
        
    public static getInstance():ReceitaService{
        console.log('📍 [ReceitaService.ts] ✨ getInstance() chamado');
        console.log('   🔍 Verificando se instância existe...');
        if(!ReceitaService.instance){
            console.log('   ❌ Instância não existe! Criando nova...');
            ReceitaService.instance = new ReceitaService;
            console.log('   ✅ Instância única criada!');
        }
        console.log('   ✅ Instância já existe! Retornando a mesma.');
        console.log('   📤 Retornando instância:', ReceitaService.instance);
        return ReceitaService.instance;
    }
  

    criar(descricao:string, valor:number, data:string, fonte:string): Receita {
        console.log('📍 [ReceitaService.ts] ➕ Método criar() chamado');
        console.log('   📥 Params:', { descricao, valor, data, fonte });
        console.log('   📊 Array ANTES de criar:', this.receitas.length, 'receitas');
        const receita = new Receita(descricao, valor, data, fonte);
        console.log('   ➕ Adicionando receita ao array...');
        this.receitas.push(receita);
        console.log('   ✅ Receita adicionada!');
        console.log('   📊 Array DEPOIS de criar:', this.receitas.length, 'receitas');
        console.log('   📦 Array completo:', this.receitas);
        console.log('   📤 Retornando receita criada:', receita);
        return receita;
    }
    listarReceitas(): Receita[]{
        console.log('📍 [Receitaservice.ts] 📋 Método listarReceitas() chamado');
        console.log('   📊 Total de receitas:', this.receitas.length);
        console.log('   📦 Array completo:', this.receitas);
        console.log('   📤 Retornando array');
        return this.receitas
    }
    buscarPorFonte(fonte:string): Receita[]{
        console.log('📍 [ReceitaService.ts] 🔍 Método buscarPorFonte() chamado');
        console.log('   📥 Fonte buscada:', fonte);
        console.log('   📊 Total de receitas no array:', this.receitas.length);
        
        console.log('   🔄 Iniciando filtro...');
        const filtrarFonte = this.receitas.filter((item, index) => {
            console.log(`      🔄 [${index}] Verificando:`, item.fonteReceita, '===', fonte, '?', item.fonteReceita === fonte);
            return item.fonteReceita === fonte;
        });
        
        console.log('   ✅ Filtro completo! Encontradas:', filtrarFonte.length);
        console.log('   📤 Retornando:', filtrarFonte);
        return filtrarFonte;
    }
    calcularTotal():number{
        console.log('📍 [ReceitaService.ts] 📊 Método calcularTotal() chamado');
        console.log('   📊 Total de receitas:', this.receitas.length);
        if (this.receitas.length === 0) {
            console.log('   ⚠️  Array vazio! Retornando 0');
            return 0;
        }
        console.log('   🔄 Iniciando reduce...');
        const somaReceitas = this.receitas.reduce((total, receita, index) => {
            console.log(`      🔄 [${index}] Total atual: ${total} + ${receita.valorTransacao} = ${total + receita.valorTransacao}`);
            return total + receita.valorTransacao;
        }, 0);
        
        console.log('   ✅ Cálculo completo!');
        console.log('   📤 Total:', somaReceitas);
        return somaReceitas;
    }   
    deletar(descricao:string):boolean{
        console.log('📍 [ReceitaService.ts] 🗑️  Método deletar() chamado');
        console.log('   📥 Descrição para deletar:', descricao);
        console.log('   📊 Array ANTES:', this.receitas.length, 'receitas');
        console.log('   🔍 Buscando índice...');
        const index = this.receitas.findIndex((item, i) => {
            console.log(`      🔄 [${i}] Comparando:`, item.descricaoTransacao, '===', descricao, '?', item.descricaoTransacao === descricao);
            return item.descricaoTransacao === descricao;
        });
        
        console.log('   🔍 Índice encontrado:', index);
        
        if (index !== -1) {
            console.log('   ✅ Item encontrado! Deletando...');
            console.log('   🗑️  Item a deletar:', this.receitas[index]);
            this.receitas.splice(index, 1);
            console.log('   ✅ Deletado com sucesso!');
            console.log('   📊 Array DEPOIS:', this.receitas.length, 'receitas');
            console.log('   📤 Retornando: true');
            return true;
        }
        
        console.log('   ❌ Item não encontrado!');
        console.log('   📤 Retornando: false');
        return false;
    }
}