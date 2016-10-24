/**
 * 用户登录
 */
var express = require('express');
var User = require('../models/user');
var crypto = require('crypto');

module.exports = function(app){
	app.get('/login',loginAction);
	app.all('/login/checkLoginInfo',checkLoginInfoAction);
};

/**
 * 登录渲染
 */
function loginAction(req,res,next){
	res.render('login',{
		title:'登录Express',
		regUrl:'http://' + req.headers.host + '/regist'
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
				ajaxRes = {
					errorCode:0,
					errorMsg:'登录成功'
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