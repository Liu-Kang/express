var Record = require('../models/record');
var pageSetting = require('../conf/pageSetting');

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

	var record = new Record();
	record.getRecordByRid(req.params.recordid,function(result){
		if(result.length > 0){
			res.render('record',{
		  	 	title:result[0].title,
		  	 	record:result[0],
		  	 	page:JSON.parse(result[0].page),
		  	 	pageSetting:pageSetting
		    });
		}
	});
}