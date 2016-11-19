var Record = require('../models/record');
var pageSetting = require('../conf/pageSetting');

module.exports = function(app){
	app.get('/edit/:type',editAction);
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
  	 	type:req.params.type,
  	 	dynamicbg:pageSetting.dynamicBg,
  	 	staticbg:pageSetting.staticBg,
  	 	animate:pageSetting.animate
    });
}

/**
 * 编辑record
 */
function editRecord(req,res,next){
	var data = req.method == 'GET' ? req.query : req.body;
	var page = {
		"content":data.content,
		"animation":data.animation
	};

	if(data.bgType == 'dynamic'){
		page["dynamicBg"] = data.bg;
	}else{
		page["staticBg"] = data.bg;
	}

	var param = {
		userid:data.userid,
		title:data.title,
		music:data.music,
		page:JSON.stringify(page)
	};

	if(!req.cookies.user){
		return res.json({
			errorCode:-1,
			errorMsg:'未登录'
		});
	}

	var record = new Record();
	record.insertRecordByUserid(param,function(result){
		console.log('插入数据后，数据库返回值:' + result);
		return res.json({
			errorCode:0,
			errorMsg:'编辑成功',
			rid:result.insertId
		});
	});
}