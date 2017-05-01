import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import dbCalls from './dbCalls';
var jwt    = require('jsonwebtoken');

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

	return api;
}
