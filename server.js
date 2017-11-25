// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

app.listen(80,'104.236.175.239');

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// DATABASE SETUP
var mongoose   = require('mongoose');
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
mongoose.connect('mongodb://localhost:27017/data/db'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('openUri', function() {
  console.log("DB connection alive");
});

// User models lives here
var User     = require('./app/models/user');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Rear view mirror');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

	// create a user (accessed at POST http://localhost:8080/users)
	.post(function(req, res) {
		
		var user  		= new User();		// create a new instance of the User model
		user.name 		= req.body.name;  // set the users name (comes from the request)
		user.email 		= req.body.email;  // set the users email (comes from the request)
		user.emailme		= req.body.emailme; // set emailme true or false
		user.requestdemo	= req.body.requestDemo;
		user.created 		= req.body.created; // creation date 
		user.status 		= req.body.status; // status, default active
		user.password 		= req.body.password; // passwd, not empty


		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created!' });
		});

		
	})

	// get all the users (accessed at GET http://localhost:8080/api/users)
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err);

			res.json(users);
		});
	});

// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

	// get the user with that id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});
	})

	// update the user with this id
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.send(err);

			user.name = req.body.name;
			user.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
console.log('Magic happens on port ' + 80);
