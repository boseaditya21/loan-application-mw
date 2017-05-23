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

	updateImage(request)
	{
		console.log(reqForm);
		var promise=new Promise(function(resolve,reject){
			var query = connection.query('INSERT INTO image SET ?', reqForm, function (error, results, fields) {
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

	fetchPersonalDetails(request)
	{
		console.log(request);
		var promise= new Promise(function(resolve,reject){
			var q='SELECT firstName,lastName,email,phone,address,password,confirmPassword,securityQuestion,securityAnswer,gender,dob FROM account WHERE email='+request;
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

	updatePersonalDetails(request)
	{
		console.log(request);
		var promise=new Promise(function(resolve,reject){
			var sql="UPDATE application SET firstName=?,lastName=?,email=?,phone=?,address=?,gender=?,dob=? WHERE email=?"
			console.log(sql);
			console.log(request.phone);
			connection.query(sql,[request.firstName,request.lastName,request.email,request.phone,request.address,request.gender,request.dob,request.email],function (err, result) {
    			if (err)
    			{
    				console.log(err);
    				throw err;
    				reject("Unsuccessfull");
    			}
    			else
    			{
    				console.log(result.affectedRows + " record(s) updated");
    				resolve("Updated Successfully");
    			}
  			});
  		});
		return promise;
	},

	dashboard(request)
	{
		console.log(request);
		var promise= new Promise(function(resolve,reject){
			var q='SELECT * FROM application WHERE email='+"'"+request+"'";
			console.log(q);
			connection.query(q,function(err,rows,fields){
				if(!err)
				{
					console.log('The solution is: ', rows);
					console.log(fields);
					if(rows.length!=0)
						resolve(rows);
					else
						resolve('Empty');
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