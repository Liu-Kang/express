module.exports = function(app){
	var index = require('./routes/index');
	var regist = require('./routes/regist');
	var login = require('./routes/login');
	var user = require('./routes/user');
	var record = require('./routes/record');
	var edit = require('./routes/edit');

	index(app);
	regist(app);
	login(app);
	user(app);
	record(app);
	edit(app);
}