const prompt = require('prompt-sync')({ sigint: true });
let id = 1;

class Contato {
    constructor(nome, telefone, email) {
        this.id = id;
        id++;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
    }
}

class Cliente extends Contato {
    constructor(nome, telefone, email, empresa) {
        super(nome, telefone, email);
        this.empresa = empresa;
    }
}

class Amigo extends Contato {
    constructor(nome, telefone, email, aniversario) {
        super(nome, telefone, email);
        this.aniversario = aniversario;
    }
}

class Colega extends Contato {
    constructor(nome, telefone, email, departamento) {
        super(nome, telefone, email);
        this.departamento = departamento;
    }
}

class Agenda {
    constructor() {
        this.agenda = [];
    }

    agendar(contato) {
        this.agenda.push(contato);
    }

    visualizar() {
        this.agenda.forEach(contato => {
            console.log(`
                ID: ${contato.id} 
                Nome: ${contato.nome}
                Telefone: ${contato.telefone} 
                Email: ${contato.email}`);

            if (contato.constructor === Cliente) {
                console.log(`Empresa: ${contato.empresa}`);
            } else if (contato.constructor === Amigo) {
                console.log(`Aniversário: ${contato.aniversario}`);
            } else if (contato.constructor === Colega) {
                console.log(`Departamento: ${contato.departamento}`);
            }
        });
    }

    editar(id) {
        this.agenda.forEach(contato => {
            if (contato.id === id) {
                contato.nome = prompt(`Digite o novo nome: `);
                contato.telefone = prompt(`Digite o novo telefone: `);
                contato.email = prompt(`Digite o novo email: `);

                if (contato.constructor === Cliente) {
                    contato.empresa = prompt(`Digite a nova empresa: `);
                } else if (contato.constructor === Amigo) {
                    contato.aniversario = prompt(`Digite o novo aniversário: `);
                } else if (contato.constructor === Colega) {
                    contato.departamento = prompt(`Digite o novo departamento: `);
                }
            }
        });
    }

    deletar(id) {
        this.agenda = this.agenda.filter(contato => contato.id !== id);
    }

    pesquisarNome(nome) {
        const resultado = this.agenda.find(contato => contato.nome === nome);

        if (resultado) {
            console.log(`
                ID: ${resultado.id} 
                Nome: ${resultado.nome}
                Telefone: ${resultado.telefone} 
                Email: ${resultado.email}`);

            if (resultado.constructor === Cliente) {
                console.log(`Empresa: ${resultado.empresa}`);
            } else if (resultado.constructor === Amigo) {
                console.log(`Aniversário: ${resultado.aniversario}`);
            } else if (resultado.constructor === Colega) {
                console.log(`Departamento: ${resultado.departamento}`);
            }
        } else {
            console.log(`Contato com o nome "${nome}" não encontrado.`);
        }
    }
}

const agenda = new Agenda;
let resposta = -1;

while (resposta !== 0) {
    console.log('1 - Adicionar Contato');
    console.log('2 - Visualizar Agenda');
    console.log('3 - Editar Contato');
    console.log('4 - Excluir Contato');
    console.log('5 - Pesquisar por Nome');
    resposta = Number(prompt(': '));

    if (resposta === 1) {
        console.log(' 1 - Contato Padrão \n 2 - Contato de um Cliente \n 3 - Contato de um Amigo \n 4 - Contato de um Colega de Trabalho');
        let r = Number(prompt("Qual tipo de contato deseja criar?"));

        if (r === 1) {
            let nome = prompt('Digite o nome: ');
            let telefone = prompt('Digite o telefone: ');
            let email = prompt('Digite o email: ');
            let contato = new Contato(nome, telefone, email);
            agenda.agendar(contato);
        } else if (r === 2) {
            let nome = prompt('Digite o nome: ');
            let telefone = prompt('Digite o telefone: ');
            let email = prompt('Digite o email: ');
            let empresa = prompt('Digite a empresa: ');
            let contato = new Cliente(nome, telefone, email, empresa);
            agenda.agendar(contato);
        } else if (r === 3) {
            let nome = prompt('Digite o nome: ');
            let telefone = prompt('Digite o telefone: ');
            let email = prompt('Digite o email: ');
            let aniversario = prompt('Digite o aniversário: ');
            let contato = new Amigo(nome, telefone, email, aniversario);
            agenda.agendar(contato);
        } else if (r === 4) {
            let nome = prompt('Digite o nome: ');
            let telefone = prompt('Digite o telefone: ');
            let email = prompt('Digite o email: ');
            let departamento = prompt('Digite o departamento: ');
            let contato = new Colega(nome, telefone, email, departamento);
            agenda.agendar(contato);
        } else {
            console.log('Digite uma opção válida');
        }
    } else if (resposta === 2) {
        agenda.visualizar();
        prompt('Confirme que quer avançar apertando Enter: ');
    } else if (resposta === 3) {
        agenda.visualizar();
        let resposta = Number(prompt('Digite o ID do contato que deseja editar: '));
        agenda.editar(resposta);
    } else if (resposta === 4) {
        agenda.visualizar();
        let resposta = Number(prompt('Digite o ID do contato que deseja excluir: '));
        agenda.deletar(resposta);
    } else if (resposta === 5) {
        let nome = prompt('Qual nome deseja pesquisar na agenda?');
        agenda.pesquisarNome(nome);
    } else if (resposta === 0) {
        console.log('Até a próxima!');
    } else {
        console.log('Digite uma opção válida');
    }
}
