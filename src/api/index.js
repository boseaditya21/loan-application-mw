import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import dbCalls from './dbCalls';
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
/*var accountSid = 'AC152bc2caaed7aafc00903aed4b59fa03'; // Your Account SID from www.twilio.com/console
var authToken = 'd17e7bffbf9bea048a599600f599e6ee';
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);*/


export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/loginDB', (req, res) => {
		console.log('Before Connection');
		var promise = dbCalls.connection().then(function (str) {
			res.end(str);
		},
		function (str) {
			res.end(str);
		});
		
	});

	api.post('/loginUser',(req,res)=>{
		console.log('Before logging in');
		console.log(req.body);
		var promise = dbCalls.loginUser(req.body).then(function (str) {
			str=JSON.stringify(str);
			//console.log(str);
			str=JSON.parse(str);
			//console.log(str);
			var keys=Object.keys(str);
			for (var i = 0; i < keys.length; i++)
			{
  				var k=(str[keys[i]]);
			}
			console.log(k);
			//res.end(JSON.stringify(k));
			if(k.password!=req.body.password)
			{
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			}
			else
			{
				var token = jwt.sign(req.body, config.secret, {
					expiresIn: "30d"
				});
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token,
					k : k
				});
			}
		},
		function (str) {
			res.end(str);
		});
	});

	api.post('/newUser',(req,res)=>{
		console.log('Before registering');
		console.log(req.body);
		var promise = dbCalls.newUser(req.body).then(function (str) {
			/*client.messages.create({
    		body: 'Welcome to Online Loan Appliction',
    		to: '+91'+req.body.phone,  // Text this number
    		from: '+918240827330' // From a valid Twilio number
			})
			.then((message) => console.log(message.sid));*/
			/*client.messages.create({ 
    		to: "+91"+req.body.phone, 
    		from: "+18177567987", 
    		body: "This is the ship that made the Kessel Run in fourteen parsecs?", 
}, function(err, message) { 
	//console.log(message);
    //console.log(message.sid);
    console.log(err); 
});*/
			let transporter = nodemailer.createTransport({
    			service: 'gmail',
    			auth: {
        			user: 'boseaditya1994@gmail.com',
        			pass: 'aditya21'
    			}
			});
				let mailOptions = {
    				from: '"Aditya Bose" <boseaditya1994@gmail.com> ', // sender address
    				to: req.body.email, // list of receivers
    				subject: 'Welcome Aboard', // Subject line
    				text: 'Hello! ?', // plain text body
    				html: 'Hello <b>'+ req.body.firstName+',</b> <br> Welcome to Online Loan Application. <br> Thanks and Regards, <br> Aditya Bose' // html body
			};
			transporter.sendMail(mailOptions, (error, info) => {
    		if (error) {
        		return console.log(error);
    		}
    		console.log('Message %s sent: %s', info.messageId, info.response);
			});
			res.end(str);
		},
		function (str) {
			res.end(str);
		});
	});

	api.post('/fetchSecurityQuestion',(req,res)=>{
		console.log('Before fetching');
		console.log(req.body);
		var promise = dbCalls.fetchSecurityQuestion(req.body.email).then(function (str) {
			str=JSON.stringify(str);
			//console.log(str);
			str=JSON.parse(str);
			//console.log(str);
			var keys=Object.keys(str);
			for (var i = 0; i < keys.length; i++)
			{
  				var k=(str[keys[i]]);
			}
			console.log(k);
			res.json({
				securityQuestion:k
			})
		},
		function (str) {
			res.end(str);
		});
	});

	api.post('/checkSecurityAnswer',(req,res)=>{
		console.log('Before fetching');
		console.log(req.body);
		var promise = dbCalls.checkSecurityAnswer(req.body).then(function (str) {
			str=JSON.stringify(str);
			//console.log(str);
			str=JSON.parse(str);
			//console.log(str);
			var keys=Object.keys(str);
			for (var i = 0; i < keys.length; i++)
			{
  				var k=(str[keys[i]]);
			}
			console.log(k);
			if(k.securityAnswer==req.body.securityAnswer)
			{
				let transporter = nodemailer.createTransport({
    			service: 'gmail',
    			auth: {
        			user: 'boseaditya1994@gmail.com',
        			pass: 'aditya21'
    			}
			});
				let mailOptions = {
    				from: '"Aditya Bose" <boseaditya1994@gmail.com> ', // sender address
    				to: req.body.email, // list of receivers
    				subject: 'Forgot Password', // Subject line
    				text: 'Hello! ?', // plain text body
    				html: 'Hello. Your password is:'+'<b> '+k.password+'</b>' // html body
			};
			transporter.sendMail(mailOptions, (error, info) => {
    		if (error) {
        		return console.log(error);
    		}
    		console.log('Message %s sent: %s', info.messageId, info.response);
			});
			res.json({
				success:true
			})
			}
			/*res.json({
				securityQuestion:k
			})*/
		},
		function (str) {
			res.end(str);
		});
	});

	api.post('/fetchPersonalDetails',(req,res)=>{
		console.log('Before fetching');
		console.log(req.body.parameter);
		var promise = dbCalls.fetchPersonalDetails(req.body.parameter).then(function (str) {
			str=JSON.stringify(str);
			//console.log(str);
			str=JSON.parse(str);
			//console.log(str);
			var keys=Object.keys(str);
			for (var i = 0; i < keys.length; i++)
			{
  				var k=(str[keys[i]]);
			}
			console.log(k);
			res.json({
				details:k
			})
		},
		function (str) {
			res.end(str);
		});
	});

	api.post('/updatePersonalDetails',(req,res)=>{
		console.log('Before updating');
		console.log(req.body);
		var promise = dbCalls.updatePersonalDetails(req.body).then(function (str) {
			res.end(str);
		},
		function (str) {
			res.end(str);
		});
	});

	api.post('/dashboard',(req,res)=>{
		console.log('Before selecting');
		console.log(req.body.parameter);
		var promise = dbCalls.dashboard(req.body.parameter).then(function (str) {
			res.end(str);
		},
		function (str) {
			res.end(str);
		});
	});

	api.post('/applicationForm1',(req,res)=>{
		console.log('Before inserting');
		console.log(req.body);
		var promise = dbCalls.applicationForm1(req.body).then(function (str) {
			res.end(str);
		},
		function (str) {
			res.end(str);
		});
	});

	/*api.post('/updateImage',(req,res)=>{
		console.log('Before updating');
		console.log(req.body);
		var promise = dbCalls.updateImage(req.body).then(function (str) {
			res.end(str);
		},
		function (str) {
			res.end(str);
		});
	});*/

	return api;
}
