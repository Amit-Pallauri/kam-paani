var mongoose = require('mongoose');
var HerokuSchema = mongoose.Schema({
    name: String
})

var heroku = mongoose.model('Heroku', HerokuSchema);
module.exports = heroku;