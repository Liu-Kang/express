var Record = require('../models/record');
var pageSetting = require('../conf/pageSetting');

module.exports = function(app){
	app.get('/record/:recordid',recordAction);
}

/**
 * record详情页
 */
function recordAction(req,res,next){
	var record = new Record();
	record.getRecordByRid(req.params.recordid,function(result){
		if(result.length > 0){
			var data = result[0];
			res.render('record',{
		  	 	title:data.title,
		  	 	record:data,
		  	 	pageSetting:pageSetting
		    });
		}
	});
}