var ejs = require("ejs");
var mq_client = require('../rpc/client');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret');


var generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


exports.processLogin = function(req, res){
	
	var ClientUsername = req.body.username;
	var ClientPassword = req.body.password;

	var msg_payload = { "username": ClientUsername, "password": ClientPassword };

    if (ClientUsername !== undefined && ClientUsername !== "" && ClientPassword !== undefined && ClientPassword !== "") {
    	console.log("Hello login");
	
    	console.log("In POST Request = UserName:"+ ClientUsername+" "+ClientPassword);
    	
    	mq_client.make_request('login_queue',msg_payload, function(err,results){
    		
    		console.log(results);
    		if(err){
    			res.status(401);
    			//throw err;
    		}
    		else 
    		{
    			if(results.code == 200){
    				console.log("valid Login");
    				var token = results.token;
    				req.session.token = token;
    				res.json({token:token});
    			}
    			else {    
    				
    				console.log("Invalid Login");
    				res.status(401);
    				res.send({"login":"Fail"});
    			}
    		}  
    	});
    }
    else
    {
    	console.log("No Input");
    	res.send({"login":"Input missing"});
    	
	}
};



exports.processSignUp = function(req, res){
	//console.log(req);
	
	var userFirstName = req.body.firstName;
	var userLastName = req.body.lastName;
	var userEmail = req.body.userName;
	var userPassword = req.body.password;
	if (userFirstName !== undefined && userFirstName !== "" && userLastName !== undefined && userLastName !== "" && userEmail !== undefined && userEmail !== "" && userPassword !== undefined && userPassword !== "")
	{
		var hashPassword = generateHash(userPassword);
		
		var msg_payload = { "firstname": userFirstName, "lastname": userLastName, "username": userEmail, "password": hashPassword };
		
    	mq_client.make_request('signup_queue',msg_payload, function(err,results){
    		
    		console.log(results);
    		if(err){
    			res.status(401);
    			//throw err;
    		}
    		else 
    		{
    			if(results.code == 200){
    				console.log("SignUp Successfull");
    				res.send({"signup":"Signup successful"});
    			}
    			else {    
    				
    				console.log("SignUp failed");
    				res.status(401);
    				res.send({"signup":"Signup failed, please try again"});
    			}
    		}  
    	});
	}
	else
	{
    	console.log("Missing Input");
    	res.send({"signup":"Missing input, please fill all the details required"});
	}
};


