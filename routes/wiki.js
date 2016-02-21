var express = require('express');

var router = express.Router();

module.exports = router;

//setup routes
router.get('/', function(req, res, next){

  //real path is /wiki
  //send fake response
  res.send('got to GET /wiki/');
});

router.post('/', function(req, res, next){
  //real path is /wiki
  //send fake response
  res.send('got to POST /wiki/');
});

router.get('/add', function(req, res, next){

  //real path is /wiki

  //send fake response
  res.render('addpage');
});
