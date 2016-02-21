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

  User.findOrCreate({name: req.body.name,email: req.body.email})
  .then(function(user){

    //create new Page
    var tags = req.body.tags.split(' ');

    var page = new Page({

      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      tags: tags,
      user: user._id
    });

    return page.save();
  })
  .then(function(savedPage){
    res.redirect(savedPage.route);
  },
  function(err){
    console.log(err);
    res.render('error',err);
  });

});

router.get('/search', function(req, res, next){

  console.log('in search query',req.query.tag);
  Page.findByTag(req.query.tag)
  .then(function(pages){

    res.render('search', {pages: pages});

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
    res.render('wikipage',{page: result, tags: result.tags});
  });

});

router.get('/:urlTitle/similar',function(req, res, next){

  Page.findOne({'urlTitle': req.params.urlTitle}).exec()
  .then(function(result){
    return Page.findSimilar(result.tags);
  })
  .then(function(pages){
    res.render('search', {pages: pages});
  });

});
