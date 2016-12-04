const User = require('../models/user');
const Record = require('../models/record');

module.exports = function(app){
	app.get('/user/:userid',userAction);
	app.all('/userdeal/getRecord',getRecord);
	app.all('/userdeal/deleteRecord',deleteRecord);
	app.all('/userdeal/updateRecord',updateRecord);
};

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
		});
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

/**
 * 修改单个record
 * 取出record数据，存进session,跳转到编辑页面
 */
function updateRecord(req,res,next){
	if(!req.cookies.user){
		return res.json({
			errorCode:-1,
			errorMsg:'未登录'
		});
	}

	var data = req.method == 'GET' ? req.query : req.body;

	var record = new Record();
	record.getRecordByRid(data.rid,function(result){
		if(result.length > 0){
			var data = result[0];
			var param = {
				userid:data.userid,
				title:data.title,
				music:data.music,
				page:data.page
			};

			req.session.record = param;
			
		    return res.json({
				errorCode:0,
				errorMsg:'',
				rid:data.rid
			});
		}else{
			return res.json({
				errorCode:-2,
				errorMsg:'没有该条记录'
			});
		}
	});
}

