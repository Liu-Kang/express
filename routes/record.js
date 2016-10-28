var express = require('express');
var router = express.Router();
var Record = require('../models/record');

module.exports = function(app){
	app.get('/record/:recordid',recordAction);
}

/**
 * record详情页
 */
function recordAction(req,res,next){
	if(!req.cookies.user){
		return res.redirect('/login');
	}

	var userInfo = {
		userid:req.cookies.user.userid,
		username:req.cookies.user.username
	};

	res.render('record',{
  	 	title:'Record',
  	 	user:userInfo
    });
}