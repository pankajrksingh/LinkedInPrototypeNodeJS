var ejs = require("ejs");
var mq_client = require('../rpc/client');


exports.updateUserSummary = function(req, res){
	//console.log(req);
	var updatedSummary = req.body.updatedSummaryInfo;
	var userName = req.body.UName;
	
	var msg_payload = { "updatedSummary": updatedSummary, "username": userName};

	mq_client.make_request('updateSummary_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			res.status(401);
			//throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Summary Updated");
				res.status(200);
				res.json(results.value);
			}
			else {    
				
				console.log("Summary not updated");
				res.status(401);
				res.json({"Summary":"Not updated"});
			}
		}  
	});

};
