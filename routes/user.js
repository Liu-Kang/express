var express = require('express');
var router = express.Router();
var User = require('../models/user');

module.exports = function(app){
	app.get('/user/:username',userAction);
	app.all('/user/getRecord',getRecord);
	app.get('/edit',editAction);
	app.all('/edit/submitRecord',editRecord);
}
/**
 * 用户主页
 */
function userAction(req,res,next){
	if(!req.cookies.user){
		res.redirect('/login');
	}

	var userInfo = {
		userid:req.cookies.user.userid,
		username:req.cookies.user.username
	};

	var param = {
		userid:req.cookies.user.userid,
		length:10
	}

	var user = new User(user);

	user.getRecordByUserid(param,function(result){
		userInfo.records = result;
		res.render('user',{
	  	 	title:'Home',
	  	 	moment:require('moment'),
	  	 	user:userInfo
	    });
	});

	
}

/**
 * 获取record列表
 */
function getRecord(req,res,next){
	var data = req.method == 'GET' ? req.query : req.body;
	if(!req.cookies.user){
		res.redirect('/login');
	}

	var param = {
		userid:data.userid
	}

	var user = new User();
	user.getRecordByUserid(record,function(result){
		return res.json({
			errorCode:0,
			errorMsg:'编辑成功'
		})
	});
}

/**
 * 编辑页面
 */
function editAction(req,res,next){
	if(!req.cookies.user){
		return res.redirect('/login');
	}

	var user = {
		userid:req.cookies.user.userid,
		username:req.cookies.user.username
	};

	res.render('edit',{
  	 	title:'Edit',
  	 	user:user
    });
}

/**
 * 编辑record
 */
function editRecord(req,res,next){
	var data = req.method == 'GET' ? req.query : req.body;
	var record = {
		userid:data.userid,
		title:data.title,
		article:data.article
	};

	if(!req.cookies.user){
		return res.json({
			errorCode:-1,
			errorMsg:'未登录'
		});
	}

	var user = new User();
	user.insertRecordByUserid(record,function(result){
		return res.json({
			errorCode:0,
			errorMsg:'编辑成功'
		})
	});
}

