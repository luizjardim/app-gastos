class Transacao {
    private descricao: string;
    private valor: number;
    private data: string;

    constructor(descricao:string, valor:number, data:string){
        console.log('📍 [Transacao.ts] 🏗️  Constructor chamado');
        console.log('   📥 Params:', { descricao, valor, data });
        this.descricao = descricao;
        this.valor = valor;
        this.data = data;
        console.log('   ✅ Transacao criada:', this);
    }

    get descricaoTransacao(){
        console.log('📍 [Transacao.ts] 🔍 Getter descricao acessado');
        return this.descricao;
    }
    get valorTransacao(){
        console.log('📍 [Transacao.ts] 🔍 Getter valor acessado');
        return this.valor;
    }
    get dataTransacao(){
        console.log('📍 [Transacao.ts] 🔍 Getter data acessado');
        return this.data;
    }

    exibir():string{
        console.log('📍 [Transacao.ts] 📤 Método exibir chamado');
        const resultado = `${this.data} / ${this.descricao}: R$: ${this.valor.toFixed(2)}`;
        console.log('   📤 Resultado:', resultado);
        return resultado;
    }


}

class Despesa extends Transacao{
    private categoria: string;

    constructor(descricao:string, valor:number, data:string, categoria:string){
        console.log('📍 [Despesa.ts] 🏗️  Constructor Despesa chamado');
        console.log('   📥 Params:', { descricao, valor, data, categoria });
        console.log('   🔍 Valor original:', valor);
        if (valor > 0 ){
            valor = valor * -1
            console.log('   ⚠️  Valor convertido para negativo:', valor);
        }
        super(descricao, valor, data);
        this.categoria = categoria; 
        console.log('   ✅ Despesa criada:', {
            descricao: this.descricaoTransacao,
            valor: this.valorTransacao,
            categoria: this.categoria
        });
    }
    exibir():string{
        console.log('📍 [Despesa.ts] 📤 Método exibir (override) chamado');
        return `${this.dataTransacao} / ${this.descricaoTransacao}: R$: ${this.valorTransacao.toFixed(2)} / Na categoria: ${this.categoria}`
    }
    get categoriaDespesa(){
        console.log('📍 [Despesa.ts] 🔍 Getter categoria acessado');
        return this.categoria;
    }


}

class Receita extends Transacao{
    private fonte: string;
    constructor(descricao:string, valor:number, data:string, fonte:string){
        console.log('📍 [Receita.ts] 🏗️  Constructor Receita chamado');
        console.log('   📥 Params:', { descricao, valor, data, fonte });
        
        console.log('   🔍 Valor original:', valor);
        if (valor < 0){
            valor = valor *-1
        }
        super(descricao, valor, data);
        this.fonte = fonte;
        console.log('   ✅ Receita criada:', {
            descricao: this.descricaoTransacao,
            valor: this.valorTransacao,
            fonte: this.fonte
        });
        
    }
    exibir():string{
        console.log('📍 [Receita.ts] 📤 Método exibir (override) chamado');
        return `${this.dataTransacao} / ${this.descricaoTransacao}: R$: ${this.valorTransacao.toFixed(2)} / Fonte: ${this.fonte}`
    }

    get fonteReceita():string{
        console.log('📍 [Receita.ts] 🔍 Getter fonte acessado');
        return this.fonte;
    }


}
class Investimento extends Transacao{
    private tipo:string;
    private rentabilidade: number;

    constructor(descricao:string, valor:number, data:string, tipo:string, rentabilidade: number){
        console.log('📍 [Investimento.ts] 🏗️  Constructor Investimento chamado');
        console.log('   📥 Params:', { descricao, valor, data, tipo });
        
        console.log('   🔍 Valor original:', valor);
        if(valor < 0){
            valor = valor*-1;
        }
        if (rentabilidade < 0){
            rentabilidade = rentabilidade *-1;
        }
        super(descricao, valor, data);
        this.tipo = tipo;
        this.rentabilidade = rentabilidade;
        console.log('   ✅ Receita criada:', {
            descricao: this.descricaoTransacao,
            valor: this.valorTransacao,
            fonte: this.tipo
        });
        
        
    }
    exibir():string{
        console.log('📍 [Investimento.ts] 📤 Método exibir (override) chamado');
        return `${this.dataTransacao} / ${this.descricaoTransacao} > R$: ${this.valorTransacao.toFixed(2)} / Tipo investimento: ${this.tipo}`
    }
    calcularRetorno():string{
        const retorno = this.valorTransacao * (this.rentabilidade/100)
        return `Retorno estimado com o R$: ${this.valorTransacao.toFixed(2)} investido é de: ${retorno.toFixed(2)} / Tipo Investimento: ${this.tipo}`
    }
}
/*
console.log('=== TESTES ===\n');

// Teste 1: Despesa com valor positivo (deve converter para negativo)
const despesa1 = new Despesa("Uber", 35.80, "2025-10-24", "Transporte");
console.log(despesa1.exibir());
console.log(`Valor armazenado: ${despesa1.valorTransacao}\n`);

// Teste 2: Receita com valor negativo (deve converter para positivo)
const receita1 = new Receita("Salário", -4500, "2025-10-01", "Trabalho CLT");
console.log(receita1.exibir());
console.log(`Valor armazenado: ${receita1.valorTransacao}\n`);

// Teste 3: Despesa com valor já negativo (deve manter)
const despesa2 = new Despesa("Netflix", -49.90, "2025-10-10", "Entretenimento");
console.log(despesa2.exibir());

// Teste 4: Receita com valor já positivo (deve manter)
const receita2 = new Receita("Freelance", 800, "2025-10-15", "Projeto Web");
console.log(receita2.exibir());

// Teste 5: Transacao base (sem herança)
const transacao = new Transacao("Transferência", 100, "2025-10-20");
console.log('\n' + transacao.exibir());


// Teste 5: Transacao base (sem herança)
const investimento = new Investimento("Investimento", -100, "2025-10-20=5", 'IPCA', -10);
console.log('\n' + investimento.exibir());
console.log('\n' + investimento.calcularRetorno())
*/
export { Transacao, Despesa, Receita, Investimento };




