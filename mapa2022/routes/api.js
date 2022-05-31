var express = require('express');
var router = express.Router();
var Cidade = require("../controllers/cidade");
const Ligacao = require('../controllers/ligacao');

/* GET home page. */
router.get('/cidades', function(req, res) {
  if(req.query["distrito"] == undefined){
    Cidade.listar()
      .then(lista => res.status(200).jsonp(lista))
      .catch(erro => res.status(501).jsonp(erro))
  }else{
    Cidade.getCitiesFromDist(req.query["distrito"])
      .then(lista => res.status(200).jsonp(lista))
      .catch(erro => res.status(501).jsonp(erro))
  }
});

router.get('/cidades/nomes', function(req, res) {
  Cidade.getSorted(req.params.id)
    .then(cidades => res.status(200).jsonp(cidades))
    .catch(erro => res.status(503).jsonp(erro))
});

router.get('/cidades/:id', function(req, res) {
  Cidade.getById(req.params.id)
    .then(cidade => res.status(200).jsonp(cidade[0]))
    .catch(erro => res.status(502).jsonp(erro))
});

router.get('/distritos', async function(req, res) {
  let distritos = await Cidade.getDistritos()
  let obj = {}

  for(element of distritos){
    obj[element] = await Cidade.getCitiesFromDist(element)
  }

  res.status(200).jsonp(obj)
});

router.get('/ligacoes', async function(req, res) {
  if(req.query["origem"] != undefined){ 
    let lig = await Ligacao.getByOrigem(req.query["origem"])
    let toSend = []

    for(elem of lig){
      let obj = {}
      obj["_id"] = elem["_id"]
      obj["destino"] = elem["destino"]
      let aux = (await Cidade.getById(elem["destino"]))
      obj["destino_cidade"] = aux[0]["nome"]
      toSend.push(obj)
    }

    res.status(200).jsonp(toSend)

  }else if (req.query["dist"] != undefined){
    let lig = await Ligacao.getByDistancia(req.query["dist"])
    let toSend = []

    for(elem of lig){
      let obj = {}
      obj["_id"] = elem["_id"]
      obj["origem"] = elem["origem"]
      let aux = await Cidade.getById(elem["origem"])
      obj["origem_cidade"] = aux[0]["nome"]
      obj["destino"] = elem["destino"]
      aux = (await Cidade.getById(elem["destino"]))

      obj["destino_cidade"] = aux[0]["nome"]
      toSend.push(obj)
    }

    res.status(200).jsonp(toSend)

  }else{
    res.status(505)
  }
});

module.exports = router;
