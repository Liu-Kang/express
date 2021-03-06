const Record = require('../models/record');
const pageSetting = require('../conf/pageSetting');

module.exports = function(app){
	app.get('/edit/:type',editAction);
	app.all('/editdeal/submitRecord',editRecord);
	app.all('/editdeal/previewRecord',previewRecord);
	app.all('/editdeal/destroyPreview',destroyPreview);
	app.all('/editdeal/updateRecord',updateRecord);
};

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

	var renderObj = {
		title:'Edit',
  	 	user:user,
  	 	urid:-1,
  	 	music:pageSetting.music,
  	 	type:req.params.type,
  	 	dynamicbg:pageSetting.dynamicBg,
  	 	staticbg:pageSetting.staticBg,
  	 	animate:pageSetting.animate
	};

	//如果session中有record，则从session中获取
	if(req.session.record){
		renderObj.record = req.session.record;
	}else{
		renderObj.record = null;
	}

	//如果是更新操作，删除record session,渲染更新标志
	if(req.query.update){
		renderObj.urid = req.query.update;
		delete req.session.record;
	}

	res.render('edit',renderObj);
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

	delete req.session.record;

	// 数据库返回：
	// OkPacket {
	//   fieldCount: 0,
	//   affectedRows: 1,
	//   insertId: 66,
	//   serverStatus: 2,
	//   warningCount: 0,
	//   message: '',
	//   protocol41: true
	//   changedRows: 0 
	// }
	var record = new Record(param);
	record.insertRecordByUserid(function(result){
		return res.json({
			errorCode:0,
			errorMsg:'编辑成功',
			rid:result.insertId
		});
	});
}

/**
 * 预览
 */
function previewRecord(req,res,next){
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

	req.session.record = param;
	
	return res.json({
		errorCode:0,
		errorMsg:''
	});
}

/**
 * 清除record的session
 */
function destroyPreview(req,res){
	delete req.session.record;
	return res.json({
		errorCode:0,
		errorMsg:'清除成功'
	});
}

/**
 * 编辑record
 */
function updateRecord(req,res,next){
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
		rid:data.rid,
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

	var record = new Record(param);
	record.updateRecordByRid(function(result){
		return res.json({
			errorCode:0,
			errorMsg:'编辑成功',
			rid:data.rid
		});
	});
}