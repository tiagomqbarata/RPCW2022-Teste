const mongoose = require("mongoose")
const { modelName } = require("../models/cidade")
var Cidade = require('../models/cidade')

module.exports.listar = () => {
    return Cidade
        .find({}, {_id : 1, nome : 1, distrito : 1})
        .exec()
}


module.exports.getById = (id) => {
    return Cidade
        .find({_id : id})
        .exec()
}

module.exports.getSorted = () => {
    return Cidade
        .find({}, {_id : 0, nome : 1})
        .sort({nome : 1})
        .exec()
}

module.exports.getCitiesFromDist = (dist) => {
    return Cidade
        .find({distrito : dist}, {_id : 1, nome : 1})
        .exec()
}

module.exports.getDistritos = () => {
    return Cidade
        .distinct("distrito")
        .exec()
}




