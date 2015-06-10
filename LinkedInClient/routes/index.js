
//Fetching Index Page
exports.index = function(req, res){
	console.log("Incoming request index : " + req.session.token);
	res.render('index.ejs', { title: 'LinkedIn Application' });
};

//Fetching Login page
exports.loginpage = function(req, res){	
		console.log("Incoming request : " + req.session.token);
		  res.render('login.ejs');
	};

//Fetching the Users Homepage
exports.homepage = function(req, res){	
	console.log("Incoming request : " + req.session.token);
	  res.render('homepage.ejs');
};

exports.connectedUsers = function(req, res){	
	console.log("Incoming request : " + req.session.token);
	console.log("Fetching connections page");
	  res.render('connections.ejs');
};

exports.pendingUserConnections = function(req, res){	
	console.log("Incoming request : " + req.session.token);
	  res.render('pendingconnections.ejs');
};

exports.searchUser = function(req, res){	
	console.log("Incoming request : " + req.session.token);
	  res.render('SearchUser.ejs');
};

exports.summaryform = function(req, res){	
	console.log("Incoming request : " + req.session.token);
	  res.render('profile_editforms/summaryform.ejs');
};
