/*
    Neste código é carregado o pacote do Express, sendo posteriormente instanciado em uma variável chamada express. Em seguida é instanciado um objeto do Express criado para lidar especificamente com o roteamento de rotas do navegador, neste caso, express.Router().
*/
const express = require('express');
const router = express.Router();

/*
    De acordo com o que está definido em app.js, quando o usuário entrar na página inicial, INDEX, será enviado um comando GET pelo navegador. Em seguida, o servidor, ouvindo este comando GET, retornará uma resposta, com o código 200 que significa que tudo deu certo, e em seguida será mostrado um arquivo json com um título e a versão.
*/
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'MentionsAPI',
        version: '1.0.0'
    });
});

module.exports = router;