var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'accounts'
});

var isConnected = false;
var remainingLoginAttempts= 5;

var restClient=
{
	connection()
	{
		var promise = new Promise(function (resolve, reject) {
   		connection.connect(function(err){
		if(!err)
		{
    		console.log("Database is connected");
    		resolve('Database is connected');    
		}
		else
		{
    		console.log("Error connecting database");
    		reject('Error connecting database')    
		}
		});
  	});
  	return promise;
	}
}
export default restClient;