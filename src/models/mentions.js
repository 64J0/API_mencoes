/*
    Chamamos o módulo mongoose, em seguida instanciamos o Schema, um objeto do namespace mongoose. Assim como é feito com o Express.
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Em seguida é modelado o schema de fato, e posteriormente este é exportado pelo mongoose.
*/
const schema = new Schema({
    friend: {
        type: String,
        required: true,
        trim: true
    },
    mention: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Mentions', schema);