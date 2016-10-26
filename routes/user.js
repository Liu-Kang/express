var express = require('express');
var router = express.Router();
var User = require('../models/user');

module.exports = function(app){
	app.get('/home/:username',userAction);
	app.get('/edit',editAction);
}

/**
 * 用户主页
 */
function userAction(req,res,next){
	var user = {
		userid:req.cookies.user.userid,
		username:req.cookies.user.username
	};

	if(!user.userid){
		res.redirect('/login');
	}

	res.render('user',{
  	 	title:'Home',
  	 	user:user
    });
}

/**
 * 编辑页面
 */
function editAction(req,res,next){
	var user = {
		userid:req.cookies.user.userid,
		username:req.cookies.user.username
	};

	if(!user.userid){
		res.redirect('/login');
	}

	res.render('edit',{
  	 	title:'Edit',
  	 	user:user
    });
}