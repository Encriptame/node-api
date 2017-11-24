var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsersSchema   = new Schema({
	name: String,
	email: String,
	emailme: Boolean,
	requestDemo: Boolean,
	created: Date,
	status: Boolean,
	password: String
});

module.exports = mongoose.model('User', UsersSchema);
