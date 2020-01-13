
/*
    Estamos importando o mongoose e referenciando nosso model Mentions para pdoermos utilizar seus métodos no controller
*/
/*
const mongoose = require('mongoose');
const Mentions = mongoose.model('Mentions');
*/

/*
    Método de listagem de dados, que é uma função assíncrona que aguarda (await) a chamada de Mentions.find(). Quando Mentions.find retornar algum valor, ele será armazenado em data e devolvido pelo express através de res.status(200).send(data). Caso aconteça algo errado, retorna-se o erro "Falha ao carregar as menções".
*/
// list
/*
exports.listMentions = async (req, res) => {
    try {
        *//*
            Nesta string na sequencia do método find são definidos os parâmetros que serão retornados do banco de dados, neste caso os campos friend e mentions do json, além disso é configurado para não retornar o _id, com a utilização do sinal de subtração anteriormente a este parâmetro
        *//*
        const data = await Mentions.find({}, 'friend mention -_id');
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({message: 'Falha ao carregar as menções.'});
    }
};
*/

/*
    Método de inserção de dados, que cria uma instância de Mentions (new Mention) e passa para o modelo os dados que recebemos via req.body. A nossa função também é assíncrona e aguarda a consolidação da inserção dos dados (await mention.save()). Então temos o envio de uma mensagem para o usuário informando que deu tudo certo ou uma mensagem de erro.
*/
// create
/*
exports.createMention = async (req, res) => {
    try {
        const mention = new Mentions({
            friend: req.body.friend,
            mention: req.body.mention
        });

        console.log(mention);

        await mention.save();

        res.status(201).send({message: 'Menção cadastrada com sucesso!'});
    } catch(e) {
        res.status(500).send({message: 'Falha ao cadastrar a menção.'});
    }
};
*/


/* ===================================================================== */


/*
    O repositório é importado, consequentemente, as chamadas de métodos são realizadas através da sintaxe repository.metodo().
*/
const { validationResult } = require('express-validator');
const repository = require('../repositories/mentions-repository');

//list
exports.listMentions = async (req, res) => {
    try {
        const data = await repository.listMentions();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({message: 'Falha ao carregar as menções!'});
    }
};

//create
exports.createMention = async (req, res) => {

    /*
        Estamos recuperando o array errors de dentro da requisição, que foi adiciona pelo check(), caso o usuário tenha cometido algum engano
    */
    const { errors } = validationResult(req);

    /*
        Em seguida validamos se errors não está vazio. Se errors possuir algum valor, significa que precisamos tratar isso.
    */
    if (errors.length > 0) {
        return res.status(400).send({message: errors});
    }

    try {
        await repository.createMention({
            friend: req.body.friend,
            mention: req.body.mention
        });
        res.status(201).send({message: 'Menção cadastrada com sucesso!'});
    } catch(e) {
        res.status(500).send({message: 'Falha ao cadastrar a menção.'});
    }
};

//update
exports.updateMention = async (req, res) => {
    const { errors } = validationResult(req);

    if(errors.length > 0) {
        return res.status(400).send({ message: errors });
    }

    try {
        await repository.updateMention(req.params.id, req.body);
        res.status(200).send({
            message: 'Menção atualizada com sucesso!'
        });
    } catch(e) {
        res.status(500).send({message: 'Falha ao atualizar a menção.'});
    }
};

//delete
exports.deleteMention = async (req, res) => {
    try {
        await repository.deleteMention(req.params.id);
        res.status(200).send({
            message: 'Menção removida com sucesso!'
        });
    } catch(e) {
        res.status(500).send({ message: 'Falha ao remover a menção.' });
    }
};