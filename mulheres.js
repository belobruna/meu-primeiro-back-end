const express = require("express"); // aqui estou iniciando o express
const router = express.Router(); // aqui estou configurando a primeira parte da rota
const cors = require('cors'); // aqui estou trazendo o pacote cors, que permite consumir essa api no front-end

const conectaBancoDeDados = require('./bancoDeDados'); // aqui estou ligando ao arquivo banco de dados
conectaBancoDeDados(); // estou chamando a função que conecta o banco de dados 

const Mulher = require('./mulherModel'); // aqui estou ligando ao arquivo model 

const app = express(); // aqui estou iniciando o app 
app.use(express.json()); // trata as requisições para formato json
app.use(cors()); 
const porta = 3333; // aqui estou criando a porta

// GET 
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find();
        response.json(mulheresVindasDoBancoDeDados);

    } catch(erro) {
        console.log(erro);
    }
};

// POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem, 
        minibio: request.body.minibio,
        citacao: request.body.citacao
    });

    try {
        const mulherCriada = await novaMulher.save();
        response.status(201).json(mulherCriada);
    } catch(erro) {
        console.log(erro);
    }
}

// PATCH 
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id);
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome;
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio;
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem;
        } 

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao;
        }
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();

        response.json(mulherAtualizadaNoBancoDeDados);
    } catch(erro) {
        console.log(erro);
    }
};

// DELETE 
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id);
        response.json({ mensagem: 'Mulher deletada com sucesso!'});
    } catch(erro) {
        console.log(erro);
    }
};

// PORTA 
function mostraPorta() {
  console.log("Servidor criado e rodando na porta ", porta);
}

app.use(router.get('/mulheres', mostraMulheres)); // configurei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)); // configurei rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)); // configurei a rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)); // configurei a rota DELETE /mulheres
app.listen(porta, mostraPorta); // servidor ouvindo a porta



// // // CODIGO ANTES DE CONECTAR O BANCO DE DADOS // // // 

// const express = require("express"); // aqui estou iniciando o express
// const router = express.Router(); // aqui estou configurando a primeira parte da rota
// const { v4: uuidv4 } = require('uuid'); 

// const conectaBancoDeDados = require('./bancoDeDados'); // aqui estou ligando ao arquivo banco de dados
// conectaBancoDeDados(); // estou chamando a função que conecta o banco de dados 

// const app = express(); // aqui estou iniciando o app 
// app.use(express.json()); // trata as requisições para formato json
// const porta = 3333; // aqui estou criando a porta

// // aqui estou criando lista inicial de mulheres
// const mulheres = [
//     {
//         id: "1",
//         nome: "Simara Conceição",
//         imagem: "https://bit.ly/3LJIyOF",
//         minibio: "Desenvolvedora e instrutora",
//     },
//     {
//         id: "2",
//         nome: "Iana Chan",
//         imagem: "https://bit.ly/3JCXBqP",
//         minibio: "CEO & Founder da PrograMaria",
//     },
//     {
//         id: "3",
//         nome: "Luana Pimentel",
//         imagem: "https://bit.ly/3FKpFaz",
//         minibio: "Senior Staff Software Engineer",
//     },
// ];

// // GET 
// function mostraMulheres(request, response) {
//     response.json(mulheres);
// }

// // POST
// function criaMulher(request, response) {
//     const novaMulher = {
//         id: uuidv4(),
//         nome: request.body.nome,
//         imagem: request.body.imagem, 
//         minibio: request.body.minibio
//     }

//     mulheres.push(novaMulher);

//     response.json(mulheres); // dizendo que a resposta é do tipo json
// }

// // PATCH 
// function corrigeMulher(request, response) {
//     function encontraMulher(mulher) {
//         if (mulher.id === request.params.id) { // encontrar uma mulher que tem o id exatamente igual ao informado na url da requisição 
//             return mulher;
//         }
//     }

//     const mulherEncontrada = mulheres.find(encontraMulher);

//     if (request.body.nome) {
//         mulherEncontrada.nome = request.body.nome;
//     }

//     if (request.body.minibio) {
//         mulherEncontrada.minibio = request.body.minibio;
//     }

//     if (request.body.imagem) {
//         mulherEncontrada.imagem = request.body.imagem;
//     }

//     response.json(mulheres);
// }

// // DELETE 
// function deletaMulher(request, response) {
//     function todasMenosEla(mulher) {
//         if(mulher.id !== request.params.id) {
//             return mulher;
//         }
//     }

//     const mulheresQueFicam = mulheres.filter(todasMenosEla);

//     response.json(mulheresQueFicam);
// }

// // PORTA 
// function mostraPorta() {
//   console.log("Servidor criado e rodando na porta ", porta);
// }

// app.use(router.get('/mulheres', mostraMulheres)); // configurei rota GET /mulheres
// app.use(router.post('/mulheres', criaMulher)); // configurei rota POST /mulheres
// app.use(router.patch('/mulheres/:id', corrigeMulher)); // configurei a rota PATCH /mulheres/:id
// app.use(router.delete('/mulheres/:id', deletaMulher)); // configurei a rota DELETE /mulheres
// app.listen(porta, mostraPorta); // servidor ouvindo a porta
