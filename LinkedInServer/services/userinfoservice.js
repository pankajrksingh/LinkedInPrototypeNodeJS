var mysql = require('./sqlqueryservice');
var util = require('util');

function userSummary_request(msg, callback){
	
	var inputUsername = msg.username;

	var res = {};
	if(inputUsername !== undefined && inputUsername !== "")
	{
		var getUserdetails="select summary as Summary,last_login as LastLogin,CONCAT_WS(' ',firstname,lastname) as Name from userdetails where username='" + inputUsername + "'";

		
		mysql.executeQuery(function(err,results){
			if(err){
				res.code = "401";
				res.value = "Failed fetching userSummary";
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);		
			}
			else 
			{
				//console.log("Summary data : " + JSON.stringify(results[0]));
				res.code = "200";
				res.value = results[0];
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);
			}  
		},getUserdetails);	
		
	}
	else
	{
		res.code = "401";
		res.value = "Failed fetching userSummary";
		util.log("Printing the response : " + JSON.stringify(res));
		callback(null, res);
	}
}


function userExperience_request(msg, callback){
	
	var inputUsername = msg.username;

	var res = {};
	if(inputUsername !== undefined && inputUsername !== "")
	{
		var getUserExperience="select * from user_experience where username='" + inputUsername + "'";

		
		mysql.executeQuery(function(err,results){
			if(err){
				res.code = "401";
				res.value = "Failed fetching userExperince";
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);	
			}
			else 
			{
				//console.log("Experince data : " + JSON.stringify(results));
				res.code = "200";
				res.value = results;
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);
			}  
		},getUserExperience);	
		
	}
	else
	{
		res.code = "401";
		res.value = "Failed fetching userExperince";
		util.log("Printing the response : " + JSON.stringify(res));
		callback(null, res);
	}
}



function userSkills_request(msg, callback){
	
	var inputUsername = msg.username;

	var res = {};
	if(inputUsername !== undefined && inputUsername !== "")
	{
		var getUserSkill="select skill from user_skills where username='" + inputUsername + "'";

		
		mysql.executeQuery(function(err,results){
			if(err){
				res.code = "401";
				res.value = "Failed fetching userSkills";
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);	
			}
			else 
			{
				//console.log("Skills data : " + JSON.stringify(results));
				res.code = "200";
				res.value = results;
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);
			}  
		},getUserSkill);	
		
	}
	else
	{
		res.code = "401";
		res.value = "Failed fetching userSkills";
		util.log("Printing the response : " + JSON.stringify(res));
		callback(null, res);
	}
}


function userEducation_request(msg, callback){
	
	var inputUsername = msg.username;

	var res = {};
	if(inputUsername !== undefined && inputUsername !== "")
	{
		var getUserEducation="select * from user_education where username='" + inputUsername + "'";

		
		mysql.executeQuery(function(err,results){
			if(err){
				res.code = "401";
				res.value = "Failed fetching userEducation";
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);	
			}
			else 
			{
				//console.log("Education data : " + JSON.stringify(results));
				res.code = "200";
				res.value = results;
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);
			}  
		},getUserEducation);	
	}
	else
	{
		res.code = "401";
		res.value = "Failed fetching userEducation";
		util.log("Printing the response : " + JSON.stringify(res));
		callback(null, res);
	}
}

exports.userSummary_request = userSummary_request;
exports.userExperience_request = userExperience_request;
exports.userSkills_request = userSkills_request;
exports.userEducation_request = userEducation_request;