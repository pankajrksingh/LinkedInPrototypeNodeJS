
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , loginhandle = require('./routes/loginpage')
  , getuserinfo = require('./routes/userdetails')
  , getuseractions = require('./routes/user_actions')
  , updateuserinfo = require('./routes/update_userinfo')
  , http = require('http')
  , path = require('path');

var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var secret = require('./config/secret');


// all environments
app.set('port', process.env.PORT || 7000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Declating all middleware "use" is used to declare middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({ secret: secret.secretToken, resave: true, saveUninitialized: true}));

app.use(express.Router());


//app.use(function(req,res,next){
//	console.log("request for "+req.url);
//	next();
//});


//All node routes for get calls
app.get(['/', '/home'], routes.index);
app.get('/loginpage', routes.loginpage);
app.get('/homepage', routes.homepage);
app.get('/connectedUsers', routes.connectedUsers);
app.get('/pendingconnections', routes.pendingUserConnections);
app.get('/searchUser', routes.searchUser);
app.get('/summaryform', routes.summaryform);

//All post calls defined
app.post('/signin', loginhandle.processLogin);
app.post('/signup', loginhandle.processSignUp);
//Post calls for UserInfo
app.post('/getUserSummary', getuserinfo.getUserSummary);
app.post('/getUserExperince', getuserinfo.getUserExp);
app.post('/getUserSkills', getuserinfo.getUserSkills);
app.post('/getUserEdu', getuserinfo.getUserEdu);
//Post call for User actions
app.post('/findConnections', getuseractions.findConnections);
app.post('/getPendingConnections', getuseractions.pendingConnections);
app.post('/getUserstatus', getuseractions.getUserstatus);
app.post('/searchUserDetails', getuseractions.searchUserDetails);
app.post('/makeuserconnection', getuseractions.connectUser);
//Post calls for updating user info
app.post('/updateUserSummary', updateuserinfo.updateUserSummary);



//Start a listener for http calls
http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});