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

	var record = new Record();
	record.getRecordByRid(req.params.recordid,function(result){
		if(result.length > 0){
			res.render('record',{
		  	 	title:'Record',
		  	 	user:userInfo,
		  	 	record:result[0]
		    });
		}
	});

	
}