const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

function mostraMulher(request, response) {
    response.json({
        nome: 'Bruna Belo',
        imagem: 'https://ssl.gstatic.com/onebox/media/sports/logos/u9Ydy0qt6JJjWhTaI6r10A_96x96.png',
        minibio: 'Desenvolvedora e fotógrafa'
    });
}

function mostraPorta() {
    console.log('Servidor criado e rodando na porta ', porta);
}

app.use(router.get('/mulher', mostraMulher));
app.listen(porta, mostraPorta);