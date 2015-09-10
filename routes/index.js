var express = require('express');
var passport = require('passport');
var Employer = require('../models/employer');
var router = express.Router();

var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Founders Resume Book' });
});

router.get('/students', function(req, res, next){
	res.render('student-submission', {title: 'Student Resume Drop' });
});

router.get('/employers', function (req, res, next) {
	res.render('employer-login', {title: 'Employer Login Page' });
});

// EMPLOYER REGISTRATION METHOD
router.post('/employers/register', function (req, res) {
	Employer.register(new Employer({username: req.body.username}), req.body.password, function (err, account) {
		console.log("Registering new employer");
		if (err) {
			console.log("Error while trying to register!");
		}
		res.redirect('/');
	});
});

// EMPLOYER LOGIN METHOD
router.post('/employers', passport.authenticate('local'), function (req, res, next) {
	console.log("Employer logged in!");
	console.log(req.user);
	res.redirect('/');
});

router.get('/employers/dashboard', function (req, res) {
	console.log("ensure logged in, then let employers view dashboard");
});

// EMPLOYER LOGOUT METHOD
router.post('/employers/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

router.post('/students', function(req, res, next){
	console.log('post to students..')
	console.log(req);
	res.send(200);
});

module.exports = router;
