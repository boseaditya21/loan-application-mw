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
	}
}
export default restClient;