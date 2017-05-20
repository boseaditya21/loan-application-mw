var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'accounts'
});

var noOfConnections=1;

var restClient=
{
	connection()
	{
		var promise = new Promise(function (resolve, reject) {
		connection.connect(function(err){
    	if(err)
    	{
        	console.error('Error:- ' + err.stack);
        	reject('Error');
        	return;
    	}
    	console.log('Connected Id:- ' + connection.threadId);
    	resolve('Connection Successfull');
		});
	});
  	return promise;
	},

	loginUser(reqForm)
	{
		console.log(reqForm);
		var promise=new Promise(function(resolve,reject){
			//SELECT password FROM account WHERE email='ab@gmail.com'
			var q='SELECT password FROM account WHERE email='+"'"+reqForm.email+"'";
			console.log(q);
			connection.query(q,function(err,rows,fields){
				if(!err)
				{
					console.log('The solution is: ', rows);
					console.log(fields);
					resolve(rows);
				}	
  				else
  				{
    				console.log('Error while performing Query.');
    				reject(err);
    				return;
  				}
			});
		});
		return promise;
	},

	newUser(reqForm)
	{
		console.log(reqForm);
		var promise=new Promise(function(resolve,reject){
			var query = connection.query('INSERT INTO account SET ?', reqForm, function (error, results, fields) {
  			if(error)
  			{
  				console.log(error);
  				reject(error);
  			}
  			console.log(results);
  			console.log(fields);
  			resolve('Registered Successfully');
		});
		});
		return promise;
	},

	fetchSecurityQuestion(request)
	{
		console.log(request);
		var promise= new Promise(function(resolve,reject){
			var q='SELECT securityQuestion FROM account WHERE email='+"'"+request+"'";
			console.log(q);
			connection.query(q,function(err,rows,fields){
				if(!err)
				{
					console.log('The solution is: ', rows);
					console.log(fields);
					resolve(rows);
				}	
  				else
  				{
    				console.log('Error while performing Query.');
    				reject(err);
    				return;
  				}
			});
		});
		return promise;
	},

	checkSecurityAnswer(request)
	{
		console.log(request);
		var promise= new Promise(function(resolve,reject){
			var q='SELECT securityAnswer,password FROM account WHERE email='+"'"+request.email+"'";
			console.log(q);
			connection.query(q,function(err,rows,fields){
				if(!err)
				{
					console.log('The solution is: ', rows);
					console.log(fields);
					resolve(rows);
				}	
  				else
  				{
    				console.log('Error while performing Query.');
    				reject(err);
    				return;
  				}
			});
		});
		return promise;
	},
}
export default restClient;