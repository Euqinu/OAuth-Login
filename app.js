var express=require('express');
var router=require('./routes/users');
var profileRoute=require('./routes/profileRoute');
var passportConfig=require('./config/passport-config');
var app=express();
var mongoose=require('mongoose');
var cookieSession=require('cookie-session');
var keys=require('./config/keys');
var passport=require('passport');

//Serving static files

app.use(express.static('public'));


//Setting up view engine
app.set('view engine','ejs');

app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys:[keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

//Connecting to mongoDB

mongoose.connect("mongoDB://localhost/oauth");
mongoose.Promise=global.Promise;


//Setting up routes 

app.use('/auth',router);
app.use('/profile',profileRoute);

//Listening to port 3000

app.listen(3000,function(req,res){
	console.log("Listening to port 3000");
});