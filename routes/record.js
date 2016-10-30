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
			var pagstyle;
			if(result[0].page.dynamic){
				pagstyle = pageSetting.dynamic[result[0].page.dynamic];
			}else{
				pagstyle = pageSetting.dynamic[result[0].page.static];
			}
			res.render('record',{
		  	 	title:result[0].title,
		  	 	record:result[0],
		  	 	page:eval(result[0].page),
		  	 	pageSetting:pageSetting
		    });
		}
	});
}