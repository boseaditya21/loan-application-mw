import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import dbCalls from './dbCalls';
var jwt = require('jsonwebtoken');

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
		},
		function (str) {
			res.end(str);
		});
	});

	return api;
}
