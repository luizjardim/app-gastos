import {Despesa} from "../models/Transacao.js";
export class DespesaService{
    private static instance: DespesaService; //Cria uma variavel que recebe a classe? 
    private despesas: Despesa[] = []; //Cria uma variavel que recebe Objetos dentro da classe Despesa em formato de array
    private constructor(){
        console.log('📍 [DespesaService.ts] 🏗️  Constructor PRIVADO chamado');
        console.log('   📦 Array de despesas inicializado (vazio):', this.despesas);
    }//Porque cria sem nada ?

    public static getInstance(): DespesaService{
        console.log('📍 [DespesaService.ts] ✨ getInstance() chamado');
        console.log('   🔍 Verificando se instância existe...');
        if(!DespesaService.instance){ //Se ainda nao existe um objeto criado
            console.log('   ❌ Instância não existe! Criando nova...');
            DespesaService.instance = new DespesaService; //Cria um novo
            console.log('   ✅ Instância única criada!');
        }
        console.log('   ✅ Instância já existe! Retornando a mesma.');
        console.log('   📤 Retornando instância:', DespesaService.instance);
        return DespesaService.instance; //Se ja existe retorna
    }

    criar(descricao:string, valor:number, data:string, categoria:string): Despesa {
        console.log('📍 [DespesaService.ts] ➕ Método criar() chamado');
        console.log('   📥 Params:', { descricao, valor, data, categoria });
        console.log('   📊 Array ANTES de criar:', this.despesas.length, 'despesas');
        const despesa = new Despesa(descricao, valor, data, categoria)
        console.log('   ➕ Adicionando despesa ao array...');
        this.despesas.push(despesa);
        console.log('   ✅ Despesa adicionada!');
        console.log('   📊 Array DEPOIS de criar:', this.despesas.length, 'despesas');
        console.log('   📦 Array completo:', this.despesas);
        console.log('   📤 Retornando despesa criada:', despesa);
        return despesa;

    }
    listarDespesas(): Despesa[] {
        console.log('📍 [DespesaService.ts] 📋 Método listarDespesas() chamado');
        console.log('   📊 Total de despesas:', this.despesas.length);
        console.log('   📦 Array completo:', this.despesas);
        console.log('   📤 Retornando array');
        return this.despesas;

    }
    buscarPorCategoria(categoria: string): Despesa[]{
        console.log('📍 [DespesaService.ts] 🔍 Método buscarPorCategoria() chamado');
        console.log('   📥 Categoria buscada:', categoria);
        console.log('   📊 Total de despesas no array:', this.despesas.length);
        
        console.log('   🔄 Iniciando filtro...');
        const filtroDespesa = this.despesas.filter((d, index) => {
            console.log(`      🔄 [${index}] Verificando:`, d.categoriaDespesa, '===', categoria, '?', d.categoriaDespesa === categoria);
            return d.categoriaDespesa === categoria;
        }); 
        console.log('   ✅ Filtro completo! Encontradas:', filtroDespesa.length);
        console.log('   📤 Retornando:', filtroDespesa);       
        return filtroDespesa;
    }
    calcularTotal(): number{
        console.log('📍 [DespesaService.ts] 📊 Método calcularTotal() chamado');
        console.log('   📊 Total de despesas:', this.despesas.length);
        console.log('   🔄 Iniciando reduce...');
        const soma = this.despesas.reduce((total, despesa, index) => {
            console.log(`      🔄 [${index}] Total atual: ${total} + ${despesa.valorTransacao} = ${total + despesa.valorTransacao}`);
            return total + despesa.valorTransacao;
        }, 0);
        console.log('   ✅ Cálculo completo!');
        console.log('   📤 Total:', soma);
        return soma;
    }
    deletar (descricao:string): boolean{
        console.log('📍 [DespesaService.ts] 🗑️  Método deletar() chamado');
        console.log('   📥 Descrição para deletar:', descricao);
        console.log('   📊 Array ANTES:', this.despesas.length, 'despesas');
        
        console.log('   🔍 Buscando índice...');
        const index = this.despesas.findIndex((item, i) => {
            console.log(`      🔄 [${i}] Comparando:`, item.descricaoTransacao, '===', descricao, '?', item.descricaoTransacao === descricao);
            return item.descricaoTransacao === descricao;
        });
        console.log('   🔍 Índice encontrado:', index);
        if (index !== -1){
            console.log('   ✅ Item encontrado! Deletando...');
            console.log('   🗑️  Item a deletar:', this.despesas[index]);
            this.despesas.splice(index, 1);
            console.log('   ✅ Deletado com sucesso!');
            console.log('   📊 Array DEPOIS:', this.despesas.length, 'despesas');
            console.log('   📤 Retornando: true');
            return true
        }
        console.log('   ❌ Item não encontrado!');
        console.log('   📤 Retornando: false');
        return false
    }
}