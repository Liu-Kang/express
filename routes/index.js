var User = require('../models/user');

module.exports = function(app){
	app.get('/',indexAction);
}

/**
 * 首页
 */
function indexAction(req,res,next){
	var user = {};

	if(req.cookies.user){
		user = {
			userid:req.cookies.user.userid,
			username:req.cookies.user.username
		};
	}
	
	res.render('index',{
  	 	title:'Express',
  	 	user:user
    });
}

