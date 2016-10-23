var express = require('express');
var router = express.Router();

module.exports = function(app){
	
	/* GET home page. */
	app.get('/regist', function(req, res, next) {
	    res.render('regist',{
	    	title:'注册Express',
	    	error:req.flash('error').toString()
	    });
	});
	app.all('/regist/submit', function(req, res, next) {
		var username = req.body.username;
		var cellphone = req.body.cellphone;
		var password = req.body.password;
		var rePassword = req.body.rePassword;
		var sex = req.body.sex;
		console.log(username);
		console.log(cellphone);
		console.log(password);
		console.log(rePassword);
		console.log(sex);
		if(password !== rePassword){
			return res.json({
				errorCode:-1,
				errorMsg:'两次输入的密码不一致!',
				url:'',
			});
		}

		return res.json({
			errorCode:0,
			errorMsg:'注册成功',
			url:'http://localhost:3000/'
		})
	});
}
