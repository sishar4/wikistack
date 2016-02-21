var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

//Create the schemas for our dB
var statuses = ['open', 'closed'];

var pageSchema = new Schema({
  title: {type: String, required: true},
  urlTitle: {type: String, required: true},
  content: {type: String, required: true},
  date: {type: Date, default: Date.now},
  status: {type: String, enum: statuses},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} //reference to User model
});

//create Virtual for formatting the URL route
pageSchema.virtual('route').get(function(){
  return '/wiki/' + this.urlTitle;
});

pageSchema.pre('validate' , function(next){

  this.urlTitle = generateUrlTitle(this.title);

  next();

});

var userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
});

//compile the schema into a collection-managing Page model
var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);


function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

//export models
module.exports = {
  Page: Page,
  User: User
};
