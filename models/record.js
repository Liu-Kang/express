var mysql = require('mysql');
var config = require('../conf/config');

var pool = mysql.createPool(config.mysql);

function Record(record){
	var record = record || {};
	this.rid = record.rid;
}

module.exports = Record;

/**
 * 根据rid获取record详细
 * @param  {[type]}   param    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Record.prototype.getRecordByRid = function(rid,callback){
	pool.getConnection(function(err,connection){
		connection.query(
			'select * from record where rid='+rid,
			function(err,result){
				if(err) throw err;

				if(result){
					callback(result);
				}
			}
		);
		connection.release();
	});
}