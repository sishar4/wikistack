var express = require('express');
var router = express.Router();
module.exports = router;

//SETUP body parser
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

//connect to Mongoose models
var models = require('../models/');
var Page = models.Page;
var User = models.User;


//setup routes
router.get('/', function(req, res, next){

  //real path is /wiki
  Page.find().exec()
  .then(function(pages){

    res.render('index',{pages: pages});

  });
});

router.post('/', function(req, res, next){
  //real path is /wiki

  //create new Page
  var page = new Page({

    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });

  // name: req.body.name,
  // email: req.body.email,
  //save to database
  page.save()
  .then(function(savedPage){
    res.redirect(savedPage.route);
  },
  function(err){
    console.log(err);
    res.render('error',err);
  });

});

router.get('/add', function(req, res, next){

  //real path is /wiki

  //send fake response
  res.render('addpage');


});


router.get('/:urlTitle',function(req, res, next){

  Page.findOne({'urlTitle': req.params.urlTitle}).exec()
  .then(function(result){
    res.render('wikipage',{page: result});
  });

});
