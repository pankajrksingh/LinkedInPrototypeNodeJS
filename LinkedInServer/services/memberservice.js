var mysql = require('./sqlqueryservice');
var util = require('util');


function userConnections_request(msg, callback){
	
	var inputUsername = msg.username;
	util.log("userConnections_request function call : " + inputUsername);

	var res = {};
	if(inputUsername !== undefined && inputUsername !== "")
	{
		var getconnectedUsers="select username,username_requestor from user_connections where status=1 and (username='" + inputUsername + "' or username_requestor='" + inputUsername + "')";

		mysql.executeQuery(function(err,results){
			if(err){
				res.code = "401";
				res.value = "Failed fetching connected users";
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);		
			}
			else 
			{
				//util.log("Search Connected Users data : " + JSON.stringify(results));
				var connectedUsername = [];
				var tempHashMap = {};
				for(var i=0; i<results.length;i++)
				{
					var tempUname = results[i].username;
					var tempUname1 = results[i].username_requestor;
					if (!tempHashMap[tempUname] && tempUname != inputUsername) 
					{
						tempHashMap[tempUname] = true; 
						connectedUsername.push(tempUname); 
					}
					if (!tempHashMap[tempUname1] && tempUname1 != inputUsername) 
					{
						tempHashMap[tempUname1] = true; 
						connectedUsername.push(tempUname1); 
					}
				}
				
				var InQueryString = JSON.stringify(connectedUsername).replace("[", "").replace("]", "");
				//util.log("InQueryString : " + InQueryString);
				var conectedUserDetail = "select username,firstname,lastname from userdetails where username in (" + InQueryString +")";
				
				mysql.executeQuery(function(err,results){
					if(err){
						res.code = "401";
						res.value = "Failed fetching connected users";
						util.log("Printing the response : " + JSON.stringify(res));
						callback(null, res);			
					}
					else 
					{
						//util.log("Connected User Details : " + results);
						res.code = "200";
						res.value = results;
						util.log("Printing the response : " + JSON.stringify(res));
						callback(null, res);
					}
				},conectedUserDetail);
			}  
		},getconnectedUsers);	
		
	}
	else
	{
		res.code = "401";
		res.value = "Failed fetching connected users";
		util.log("Printing the response : " + JSON.stringify(res));
		callback(null, res);	
	}
}





function userPendingConnections_request(msg, callback){
	
	var inputUsername = msg.username;
	util.log("userPendingConnections_request function call : " + inputUsername);

	var res = {};
	if(inputUsername !== undefined && inputUsername !== "")
	{
		var getconnectedUsers="select username,username_requestor from user_connections where status=0 and (username='" + inputUsername + "' or username_requestor='" + inputUsername + "')";

		mysql.executeQuery(function(err,results){
			if(err){
				res.code = "401";
				res.value = "Failed fetching pending connections for user";
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);		
			}
			else 
			{
				//util.log("Search Pending Connections Users data : " + JSON.stringify(results));
				var connectedUsername = [];
				var tempHashMap = {};
				for(var i=0; i<results.length;i++)
				{
					var tempUname = results[i].username;
					var tempUname1 = results[i].username_requestor;
					if (!tempHashMap[tempUname] && tempUname != inputUsername) 
					{
						tempHashMap[tempUname] = true; 
						connectedUsername.push(tempUname); 
					}
					if (!tempHashMap[tempUname1] && tempUname1 != inputUsername) 
					{
						tempHashMap[tempUname1] = true; 
						connectedUsername.push(tempUname1); 
					}
				}
				
				var InQueryString = JSON.stringify(connectedUsername).replace("[", "").replace("]", "");
				//util.log("InQueryString : " + InQueryString);
				var conectedUserDetail = "select username,firstname,lastname from userdetails where username in (" + InQueryString +")";
				
				mysql.executeQuery(function(err,results){
					if(err){
						res.code = "401";
						res.value = "Failed fetching pending connections for user";
						util.log("Printing the response : " + JSON.stringify(res));
						callback(null, res);			
					}
					else 
					{
						//util.log("Pending Connections User Details : " + results);
						res.code = "200";
						res.value = results;
						util.log("Printing the response : " + JSON.stringify(res));
						callback(null, res);
					}
				},conectedUserDetail);
			}  
		},getconnectedUsers);	
		
	}
	else
	{
		res.code = "401";
		res.value = "Failed fetching pending connections for user";
		util.log("Printing the response : " + JSON.stringify(res));
		callback(null, res);	
	}
}


function userSearchStatus_request(msg, callback){
	
	var inputUsername = msg.username;
	var searchedUserName = msg.searchname;

	util.log("userSearchStatus_request function call : " + inputUsername);

	var res = {};
	if(inputUsername !== undefined && inputUsername !== "" && searchedUserName !== undefined && searchedUserName !== "")
	{
		var searchInputUser="select status from user_connections where (username='" + inputUsername + "' and username_requestor='" + searchedUserName + "') or (username='" + searchedUserName + "' and username_requestor='" + inputUsername + "')";

		
		mysql.executeQuery(function(err,results){
			if(err){
				res.code = "401";
				res.value = "Failed fetching user searched status";
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);		
			}
			else 
			{
				//util.log("Searched User status data : " + JSON.stringify(results[0]));
	    		if(inputUsername == searchedUserName)
				{
	    			results[0] = {status: 1};
				}
				res.code = "200";
				res.value = results;
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);
			}  
		},searchInputUser);	
		
	}
	else
	{
		res.code = "401";
		res.value = "Failed fetching user searched status";
		util.log("Printing the response : " + JSON.stringify(res));
		callback(null, res);	
	}
}

function userSearch_request(msg, callback){
	
	var SearchedUser = msg.usersearch;

	util.log("userSearch_request function call : " + SearchedUser);

	var res = {};
	if(SearchedUser[0] !== undefined && SearchedUser[0] !== "" && SearchedUser[1] !== undefined && SearchedUser[1] !== "")
	{
		var searchInputUser="select username,summary,firstname,lastname from userdetails where firstname='" + SearchedUser[0] + "' and lastname='" + SearchedUser[1] + "'";

		
		mysql.executeQuery(function(err,results){
			if(err){
				res.code = "401";
				res.value = "Failed fetching user searched";
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);			
			}
			else 
			{
				//util.log("Searched User Details : " + results);
				res.code = "200";
				res.value = results;
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);
			}  
		},searchInputUser);	

	}
	else
	{
		res.code = "401";
		res.value = "Failed fetching user searched";
		util.log("Printing the response : " + JSON.stringify(res));
		callback(null, res);	
	}
}


function userConnect_request(msg, callback){
	
	var inputUserName = msg.username;
	var inputUserToConnect = msg.userconnect;

	util.log("userConnect_request function call : " + inputUserName);

	var res = {};
	if(inputUserName !== undefined && inputUserName !== "" && inputUserToConnect !== undefined && inputUserToConnect !== "")
	{
		var serchConnectUser="select * from user_connections where (username='" + inputUserName + "' and username_requestor='" + inputUserToConnect + "') or (username='" + inputUserToConnect + "' and username_requestor='" + inputUserName + "')";
		var searchConnectInsertQuery= "INSERT INTO user_connections (username, username_requestor, status) VALUES (" +
			 "'" + inputUserToConnect + "', '" + inputUserName + "', '" + 0 +"')";
		
		var serchConnectUpdateQuery= "update user_connections SET status=1 where (username='" + inputUserName + "' and username_requestor='" + inputUserToConnect + "') or (username='" + inputUserToConnect + "' and username_requestor='" + inputUserName + "')";

		
		mysql.executeQuery(function(err,results){
			if(err){
				res.code = "401";
				res.value = "Failed operation of connection users";
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);			
			}
			else 
			{
				//util.log("Connected User data : " + JSON.stringify(results[0]));
				
				if(results.length > 0)
				{
					mysql.executeQuery(function(err,results){
						if(err){
							res.code = "401";
							res.value = "Failed operation of connection users";
							util.log("Printing the response : " + JSON.stringify(res));
							callback(null, res);		
						}
						else 
						{
							res.code = "200";
							res.value = results;
							util.log("Printing the response : " + JSON.stringify(res));
							callback(null, res);
						}
						},serchConnectUpdateQuery);	
				}
				else
				{
					mysql.executeQuery(function(err,results){
						if(err){
							res.code = "401";
							res.value = "Failed operation of connection users";
							util.log("Printing the response : " + JSON.stringify(res));
							callback(null, res);			
						}
						else 
						{
							res.code = "200";
							res.value = results;
							util.log("Printing the response : " + JSON.stringify(res));
							callback(null, res);
						}
						},searchConnectInsertQuery);						
				}			
				
			}  
		},serchConnectUser);	

	}
	else
	{
		res.code = "401";
		res.value = "Failed operation of connection users";
		util.log("Printing the response : " + JSON.stringify(res));
		callback(null, res);	
	}
}



function updateSummary_request(msg, callback){
	
	var inputUpdatedSummary = msg.updatedSummary;
	var inputUserName = msg.username;


	util.log("updateSummary_request function call : " + inputUserName);

	var res = {};
	if(inputUserName !== undefined && inputUserName !== "" && inputUpdatedSummary !== undefined && inputUpdatedSummary !== "")
	{
		var updateUserSummaryQuery = "update userdetails SET summary='" + inputUpdatedSummary + "' where username='" + inputUserName + "'";
		util.log("updateUserSummaryQuery : " + updateUserSummaryQuery);
		mysql.executeQuery(function(err,results){
			if(err){
				res.code = "401";
				res.value = "Failed operation of updating summary";
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);			
			}
			else 
			{
				res.code = "200";
				res.value = results;
				util.log("Printing the response : " + JSON.stringify(res));
				callback(null, res);			
			}
		},updateUserSummaryQuery);	

	}
	else
	{
		res.code = "401";
		res.value = "Failed operation of updating summary";
		util.log("Printing the response : " + JSON.stringify(res));
		callback(null, res);	
	}
}



exports.userConnections_request = userConnections_request;
exports.userPendingConnections_request = userPendingConnections_request;
exports.userSearchStatus_request = userSearchStatus_request;
exports.userSearch_request = userSearch_request;
exports.userConnect_request = userConnect_request;
exports.updateSummary_request = updateSummary_request;