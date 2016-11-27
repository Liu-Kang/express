var User = require('../models/user');
var Record = require('../models/record');

module.exports = function(app){
	app.get('/user/:userid',userAction);
	app.all('/userdeal/getRecord',getRecord);
	app.all('/userdeal/deleteRecord',deleteRecord);
}

/**
 * 用户主页
 */
function userAction(req,res,next){
	if(!req.cookies.user){
		res.redirect('/login');
	}

	var userInfo = {
		userid:req.params.userid,
		loginid:req.cookies.user.userid,
		loginname:req.cookies.user.username
	};

	var param = {
		userid:req.params.userid,
		limit:20
	}

	var record = new Record();

	record.getRecordByUserid(param,function(result){
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

	var record = new Record();
	record.getRecordByUserid(param,function(result){
		return res.json({
			errorCode:0,
			errorMsg:'编辑成功'
		})
	});
}


/**
 * 删除单个record
 */
function deleteRecord(req,res,next){
	var data = req.method == 'GET' ? req.query : req.body;

	if(!req.cookies.user){
		return res.json({
			errorCode:-1,
			errorMsg:'未登录'
		});
	}

	var rid = data.rid;

	var record = new Record();
	record.deleteRecordByRid(rid,function(result){
		return res.json({
			errorCode:0,
			errorMsg:'删除成功'
		});
	});
}

