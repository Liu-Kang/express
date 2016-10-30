var Record = require('../models/record');
var pageSetting = require('../conf/pageSetting');

module.exports = function(app){
	app.get('/edit',editAction);
	app.all('/edit/submitRecord',editRecord);
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
  	 	user:user,
  	 	music:pageSetting.music,
  	 	dynamicbg:pageSetting.dynamic,
  	 	staticbg:pageSetting.static
    });
}

/**
 * 编辑record
 */
function editRecord(req,res,next){
	var data = req.method == 'GET' ? req.query : req.body;
	var param = {
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

	var record = new Record();
	record.insertRecordByUserid(param,function(result){
		return res.json({
			errorCode:0,
			errorMsg:'编辑成功'
		})
	});
}