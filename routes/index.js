var express = require('express');

var router = express.Router();

module.exports = router;


//SETUP body parser
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

//setup routes
router.get('/', function(req,res,next){

  console.log('home dir');
  res.send('hello');

});
