const Record = require('../models/record');
const pageSetting = require('../conf/pageSetting');

module.exports = function(app){
	app.get('/record/:recordid',recordAction);
};

/**
 * record详情页
 */
function recordAction(req,res,next){
	//如果session中有值，则从session中获取
	if(req.params.recordid === 'preview'){
		if(req.session.record){
			return res.render('record',{
				title:req.session.record.title,
				preview:1,
		  	 	record:req.session.record,
		  	 	pageSetting:pageSetting
			});
		}
	}

	var record = new Record();
	record.getRecordByRid(req.params.recordid,function(result){
		if(result.length > 0){
			var data = result[0];
			res.render('record',{
		  	 	title:data.title,
		  	 	preview:0,
		  	 	record:data,
		  	 	pageSetting:pageSetting
		    });
		}
	});
}