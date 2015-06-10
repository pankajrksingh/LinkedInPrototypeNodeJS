var ejs = require("ejs");
var mq_client = require('../rpc/client');


exports.findConnections = function(req, res){
	//console.log(req);
	var UserName = req.body.UName;
	var msg_payload = { "username": UserName };

	mq_client.make_request('userConnections_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			console.log("Connections not found");
			res.status(401);
			res.send({"Connections":"Not found"});
		}
		else 
		{
			if(results.code == 200){
				console.log("Connections Found");
				res.status(200);
				res.json(results.value);
			}
			else {    
				
				console.log("Connections not found");
				res.status(401);
				res.send({"Connections":"Not found"});
			}
		}  
	});	

};



exports.pendingConnections = function(req, res){
	//console.log(req);
	var UserName = req.body.UName;
	var msg_payload = { "username": UserName };

	mq_client.make_request('userPendingConnections_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			res.status(401);
			//throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Pedinding connection list Found");
				res.status(200);
				res.json(results.value);
			}
			else {    
				
				console.log("Pedinding connection list not found");
				res.status(401);
				res.send({"Peding_Connections":"Not found"});
			}
		}  
	});

};


exports.getUserstatus = function(req, res){
	//console.log(req);
	//console.log(req.body.UName);

	var InputUsername = req.body.UName;
	var UserToSearch = req.body.searchname;

	var msg_payload = { "username": InputUsername , "searchname" : UserToSearch};

	mq_client.make_request('userSearchStatus_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			res.status(401);
			//throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("User Status Found");
				res.status(200);
				res.json(results.value);
			}
			else {    
				
				console.log("User Status not found");
				res.status(401);
				res.send({"User_Status":"Not found"});
			}
		}  
	});

};


exports.searchUserDetails = function(req, res){
	//console.log(req);
	//console.log(req.body.UName);

	var UserInfo = req.body.UName.split(" ");
	//var UserInfo = ["Pankaj", "Singh"];

	var msg_payload = { "usersearch": UserInfo };

	mq_client.make_request('userSearch_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			res.status(401);
			//throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("User Searched Found");
				res.status(200);
				res.json(results.value);
			}
			else {    
				
				console.log("User Searched not found");
				res.status(401);
				res.send([]);
			}
		}  
	});

};



exports.connectUser = function(req, res){
	//console.log(req);


	var InputUsername = req.body.UName;
	var UserToConnect = req.body.connectuser;
	
	var msg_payload = { "username": InputUsername, "userconnect" : UserToConnect};

	mq_client.make_request('userConnect_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			res.status(401);
			//throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("User Searched Found");
				res.status(200);
				res.json(results.value);
			}
			else {    
				
				console.log("User Searched not found");
				res.status(401);
				res.send({"User_Search":"Not found"});
			}
		}  
	});


};