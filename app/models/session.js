var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SessionSchema   = new Schema({
	email: String,
	created: {type: "date"},
	status: Boolean,
	token: String
});

module.exports = mongoose.model('Session', SessionSchema);
