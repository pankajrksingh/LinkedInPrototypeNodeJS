var ejs = require("ejs");
var mq_client = require('../rpc/client');


exports.getUserSummary = function(req, res){
	//console.log(req);
	var UserName = req.body.UName;
	
	var msg_payload = { "username": UserName };

	mq_client.make_request('userSummary_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			res.status(401);
			//throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Summary Found");
				res.status(200);
				res.json(results.value);
			}
			else {    
				
				console.log("Summary not found");
				res.status(401);
				res.json({"Summary":"Not found"});
			}
		}  
	});

};


exports.getUserExp = function(req, res){
	//console.log(req);
	var UserName = req.body.UName;
	var msg_payload = { "username": UserName };

	mq_client.make_request('userExperience_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			res.status(401);
			//throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Experience Found");
				res.status(200);
				res.json(results.value);
			}
			else {    
				
				console.log("Experience not found");
				res.status(401);
				res.send({"Experience":"Not found"});
			}
		}  
	});

};


exports.getUserSkills = function(req, res){
	//console.log(req);
	var UserName = req.body.UName;
	var msg_payload = { "username": UserName };

	mq_client.make_request('userSkills_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			res.status(401);
			//throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Skills Found");
				res.status(200);
				res.json(results.value);
			}
			else {    
				
				console.log("Skills not found");
				res.status(401);
				res.send({"Skills":"Not found"});
			}
		}  
	});

};

exports.getUserEdu = function(req, res){
	//console.log(req);
	var UserName = req.body.UName;
	var msg_payload = { "username": UserName };

	mq_client.make_request('userEducation_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			res.status(401);
			//throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Education Found");
				res.status(200);
				res.json(results.value);
			}
			else {    
				
				console.log("Education not found");
				res.status(401);
				res.send({"Education":"Not found"});
			}
		}  
	});

};