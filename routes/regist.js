var express = require('express');
var router = express.Router();
var User = require('../models/user');

module.exports = function(app){
	app.get('/regist', registAction);
	app.all('/regist/submit', submitAction);
}

/**
 * 页面渲染
 */
function registAction(req, res, next){
	res.render('regist',{
    	title:'注册Express'
    });
}

/**
 * 注册用户信息
 */
function submitAction(req, res, next){
	var data = req.query;
	if(req.method == 'POST'){
		data = req.body;
	}

	var newUser = {
		username : data.username,
		cellphone : data.cellphone,
		password : data.password,
		sex : data.sex
	};

	var rePassword = data.rePassword;
	
	
	if(newUser.password !== rePassword){
		return res.json({
			errorCode:-1,
			errorMsg:'两次输入的密码不一致!',
			url:'',
		});
	}
	var user = new User(newUser);

	user.getUserByName(function(result){
		//不能把create操作单独拿到外面，
		//原因似乎是return res.json这步操作需要花时间？
		//一个方法里面不能执行两次res.xxx的操作，否则报错：
		//Can't set headers after they are sent
		if(result.length > 0){
			return res.json({
				errorCode:-2,
				errorMsg:'该用户名已经被注册!',
				url:'',
			});
		}else{
			user.createUser(function(result){
				return res.json({
					errorCode:0,
					errorMsg:'注册成功',
					url:'http://localhost:3000/'
				});
			});
		}
	});
}
