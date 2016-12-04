/**
 * 用户登录
 */
const User = require('../models/user');
const crypto = require('crypto');

module.exports = function(app){
	app.get('/login',loginAction);
	app.get('/loginOut',loginOut);
	app.all('/logindeal/checkLoginInfo',checkLoginInfoAction);
};

/**
 * 登录渲染
 */
function loginAction(req,res,next){
	res.render('login',{
		title:'登录Express',
		regUrl:'http://' + req.headers.host + '/regist',
		userid:req.cookies.userid
	});
}

/**
 * 提交登录请求
 */
function checkLoginInfoAction(req,res,next){
	var data = req.method == 'GET' ? req.query : req.body;

	var username = data.username;
	var md5 = crypto.createHash('md5');
	var password = md5.update(data.password).digest('hex');

	var user = new User({
		username : username,
		password : password
	});

	user.getUserByName(function(result){
		var ajaxRes = {};

		if(result.length > 0){
			if(password !== result[0].password){
				ajaxRes = {
					errorCode:-1,
					errorMsg:'密码错误'
				};
			}else{
				var user = {
					userid:result[0].id,
					username:result[0].username
				};
				res.cookie('user',user, {maxAge:1000*60*60*24,httpOnly: false});
				ajaxRes = {
					errorCode:0,
					errorMsg:'登录成功',
					url:'http://' + req.headers.host + '/'
				};
			}
		}else{
			ajaxRes = {
				errorCode:-2,
				errorMsg:'没有此用户'
			};
		}

		res.json(ajaxRes);
	});
}

/**
 * 退出登录
 */
function loginOut(req,res,next){
	res.clearCookie('user');
	res.json({
		errorCode:0,
		errorMsg:'成功退出',
		url:'http://' + req.headers.host + '/'
	});

}