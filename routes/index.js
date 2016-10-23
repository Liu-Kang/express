var express = require('express');
var router = express.Router();

module.exports = function(app){
	var user = {
 		uid:1,
 		name : 'Tony',
 		friend : ['Jerry','Tom','Martin'],
 		recordlist : ['201601','201603','201604','201606','201610']
 	}
	/* GET home page. */
	app.get('/index', function(req, res, next) {
	    res.render('index',{
	  	 	title:'record',
	  	 	user:user
	    });
	});

	app.all('/getFriends',function(req,res,next){
		var name = req.query['name'];
		var type = req.query['type'];
		console.log('name: ' + name + '  type: ' + type);
		res.json({
			errorCode : 0,
			errorMsg : '',
			record : user.recordlist
		});
	});
}

