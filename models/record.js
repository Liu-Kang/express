var mysql = require('mysql');
var config = require('../conf/config');

var pool = mysql.createPool(config.mysql);

function Record(record){}

module.exports = Record;

/**
 * 根据用户id插入record
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Record.prototype.insertRecordByUserid = function(record,callback){
	pool.getConnection(function(err,connection){
		connection.query(
			'insert into record (uid,cdate,udate,title,page,music,open) values (?,now(),now(),?,?,?,1)',
			[record.userid,record.title,record.page,record.music],
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

/**
 * 根据用户id获取record列表
 * @param  {[type]}   param    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Record.prototype.getRecordByUserid = function(param,callback){
	pool.getConnection(function(err,connection){
		connection.query(
			'select * from record where uid='+param.userid+' order by cdate limit ' + param.limit,
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