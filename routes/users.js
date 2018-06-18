var express=require('express');
var passport=require('passport');
var router=express.Router();



router.get('/',function(req,res){
	res.render('index',{user:req.user});
});

router.get('/login',function(req,res){
	res.render('login');
});

router.get('/logout',function(req,res){
	//res.render('logout');
	req.logout();
	res.redirect('/auth');
});

router.get('/google',passport.authenticate('google',{
	scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),function(req,res){
	//res.send('callback function');
	//res.send(req.user);
	//now user details is attached to the request.so we can access the user detail by req.user
	res.redirect('/profile');
});

module.exports=router;