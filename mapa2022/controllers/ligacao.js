const mongoose = require("mongoose")
const { modelName } = require("../models/ligacao")
var Ligacao = require('../models/ligacao')

module.exports.getByOrigem = (origem) => {
    return Ligacao
        .find({origem : origem}, {_id : 1, destino : 1})
        .exec()
}

module.exports.getByDistancia = (distancia) => {
    return Ligacao
        .find({}, {_id : 1, origem : 1, destino : 1})
        .where('distancia').gte(distancia)
        .exec()
}

