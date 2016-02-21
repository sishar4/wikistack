var express = require('express');

var router = express.Router();

module.exports = router;




//setup routes
router.get('/', function(req,res,next){

  console.log('home dir');
  res.redirect('/wiki');

});

router.get('/search', function(req, res, next){

  res.render('search');
});
