const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();
var jsonfile = require("jsonfile")

var token = jsonfile.readFileSync(__dirname + "/../public/static/key.json")["token"]


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/classes', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token='+ token)
    .then(resp => {
      res.render('classes', { classes : resp.data });
    })
    .catch(function(error){
        console.log(error)
    })
});

router.get('/classes/:id', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.id + '?token='+ token)
    .then(resp => {
      res.render('classes', { classes : resp.data });
    })
    .catch(function(error){
        console.log(error)
    })
});

router.get('/termosIndice', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token='+ token)
    .then(resp => {
      console.log(resp);
      res.render('termosindice', { content : resp.data });
    })
    .catch(function(error){
        console.log(error)
    })
});



module.exports = router;
