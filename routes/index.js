var express = require('express');

var router = express.Router();

module.exports = router;




//setup routes
router.get('/', function(req,res,next){

  console.log('home dir');
  res.send('hello');

});
