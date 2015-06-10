var mysql = require('mysql');


var config = {
		  host     : 'localhost',
		  user     : 'root',
		  password : 'Dragon@123',
		  database : 'linkedinschema'
		};
var connection = mysql.createConnection(config);

connection.connect(function(err) {
  // connected! (unless `err` is set)
});

function executeQuery(callback,sqlQuery){
	
	connection = mysql.createConnection(config);
	//console.log("\nSQL Query::"+sqlQuery);
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			//console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	//console.log("\nConnection closed..");
	connection.end();
}	

exports.executeQuery=executeQuery;