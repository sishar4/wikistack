var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

module.exports = router;

//connect to Mongoose models
var models = require('../models/');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next){
  User.find().exec()
  .then(function(users){

    res.render('users',{users: users});

  }).catch(next);
});

router.get('/:userID', function(req, res, next){

  console.log(req.params.userID);
  var userPromise = User.findOne({_id: req.params.userID}).exec();

  var pagesPromise = Page.find({author: req.params.userID}).exec();

  Promise.join(userPromise, pagesPromise, function(user, pages){
    res.render('singleuser', { user: user, pages: pages });
  })
  .catch(next);

});
