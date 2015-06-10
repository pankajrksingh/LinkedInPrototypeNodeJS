var mysql = require('./sqlqueryservice');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
var util = require('util');


var generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

var validatePassword = function(password, storedPassword) {
    return bcrypt.compareSync(password, storedPassword);
};


function login_request(msg, callback){
	
	//var res = {};
	util.log("In handle request:"+ msg.username);
	
	var inputUsername = msg.username;
	var inputPassword = msg.password;
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	
	//Fetching date info
	var dateObj = new Date();
	var cDate = dateObj.getDate();
	var cMonth = dateObj.getMonth();
	var cYear = dateObj.getFullYear();
	var cHour = dateObj.getHours();
	var cMinutes = dateObj.getMinutes();
	var DateInfo =  cMonth + "-" + cDate + "-" + cYear + " " + cHour + ":" + cMinutes;	
	//console.log("DateInfo : " + DateInfo);
	
	
	var getUser="select password from userdetails where username='" + inputUsername + "'";
	var updateLastLogin = "update userdetails set last_login='" + DateInfo + "' where username='" + inputUsername + "'";
	
	if(inputUsername !== undefined && inputUsername !== "" && inputPassword !== undefined && inputPassword !== "")
	{
		mysql.executeQuery(function(err,results){
			if(err){
				res.code = "401";
				res.value = "Failed Login";
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);
			}
			else 
			{
				if(results.length > 0){
					if(validatePassword(inputPassword, results[0].password))
					{
						var token = jwt.sign(inputUsername, secret.secretToken, { expiresInMinutes: 60 });
						mysql.executeQuery(function(err,results){
							if(err){ throw err;	}
							else 
							{ console.log("Updated Last Login"); }},updateLastLogin);
						res.code = "200";
						res.value = "Succes Login";
						res.token = token;
						util.log("Printing the response : " + JSON.stringify(res));
						callback(null, res);
					}
					else
					{
						res.code = "401";
						res.value = "Failed Login";
						util.log("Printing the response : " + JSON.stringify(res));
						callback(null, res);
					}
				}
				else
				{
					res.code = "401";
					res.value = "Failed Login";
					util.log("Printing the response : " + JSON.stringify(res));
					callback(null, res);
				}
				
			}
		},getUser);
	}
	else
	{
		res.code = "401";
		res.value = "Failed Login";
		util.log("Printing the response : " + JSON.stringify(res));
		callback(null, res);
	}
}

function signup_request(msg, callback){
	
	var inputFirstname = msg.firstname;
	var inputLastName = msg.lastname;
	var inputUsername = msg.username;
	var inputPassword = msg.password;
	var res = {};
	if(inputUsername !== undefined && inputUsername !== "" && inputPassword !== undefined && inputPassword !== "" && inputFirstname !== undefined && inputFirstname !== "" && inputLastName !== undefined && inputLastName !== "")
	{
		var getUser="select username from userdetails where username='" + inputUsername + "'";
		
		
		mysql.executeQuery(function(err,results){
			if(err){
				res.code = "401";
				res.value = "Failed Signup";
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);
			}
			else 
			{
				if(results.length > 0){
					util.log("User already exists");
					res.code = "200";
					res.value = "User already exists";
					util.log("Printing the response : " + JSON.stringify(res));
					callback(null, res);
				}
				else {    
					
					var insertQuery = "INSERT INTO userdetails (username, password, firstname, lastname) VALUES ("
						+ "'" + inputUsername + "', '" + inputPassword + "', '" + inputFirstname + "', '" + inputLastName +"')";
					util.log("Adding User");
					mysql.executeQuery(function(err,results){
								if(err){
									res.code = "401";
									res.value = "Failed Signup";
									util.log("Printing the response : " + JSON.stringify(res));
									callback(null, res);	
								}
								else 
								{
									util.log("User created");
									res.code = "200";
									res.value = "Successful Signup";
									util.log("Printing the response : " + JSON.stringify(res));
									callback(null, res);
								}
							},insertQuery);
				}
			}  
		},getUser);
		
	}
	else
	{
		res.code = "401";
		res.value = "Failed Signup";
		util.log("Printing the response : " + JSON.stringify(res));
		callback(null, res);
	}
}

exports.login_request = login_request;
exports.signup_request = signup_request;