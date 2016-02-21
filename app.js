var express = require('express');

var app = express();

var morgan = require('morgan');

//MORGAN
app.use(morgan('dev'));

//set up routers
app.use('/', require('./routes'));
app.use('/wiki', require('./routes/wiki'));

//setup static route to public folder
app.use(express.static('public'));



//set up swig
var swig = require('swig');
// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});


var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('server listening on port '+port);

});
