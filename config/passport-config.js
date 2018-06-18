var passport=require('passport');
var googleStrategy=require('passport-google-oauth20');
var keys=require('./keys');
var User=require('../models/schema');
//Using strategy

passport.use(new googleStrategy({
	callbackURL:'/auth/google/redirect',
	clientID: keys.google.clientID,
	clientSecret: keys.google.clientSecret
},function(accessToken,refreshToken,profile,done){
	//callback function
	//console.log(profile);
	//Retreiving users
	User.findOne({googleID:profile.id}).then(function(currentUser){
		if(currentUser){
			console.log('user is '+ currentUser);
			done(null,currentUser);

		}
		else{
			new User({
		username:profile.displayName,
		googleID:profile.id,
		thumbnail:profile._json.image.url
	}).save().then(function(newUser){
		console.log(newUser);
		done(null,newUser);
	});
	}
	})
	
	//console.log('callback function');
}));

passport.serializeUser(function(user,done){
	done(null,user.id);
});

passport.deserializeUser(function(id,done){
	User.findById(id).then(function(user){
		done(null,user);
	});
});