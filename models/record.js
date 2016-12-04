'use strict';

const mysql = require('mysql');
const config = require('../conf/config');
const pool = mysql.createPool(config.mysql);

function Record(record){
	this.record = record || {};
}

module.exports = Record;

/**
 * 根据用户id插入record
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Record.prototype.insertRecordByUserid = function(callback){
	let self = this;
	pool.getConnection(function(err,connection){
		connection.query(
			'insert into record (uid,cdate,udate,title,page,music,open) values (?,now(),now(),?,?,?,1)',
			[self.record.userid,self.record.title,self.record.page,self.record.music],
			function(err,result){
				if(err) throw err;

				if(result){
					callback(result);
				}
			}
		);
		connection.release();
	});
};

/**
 * 根据用户id获取record列表
 * @param  {[type]}   param    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Record.prototype.getRecordByUserid = function(param,callback){
	pool.getConnection(function(err,connection){
		connection.query(
			'select * from record where uid=? order by cdate limit ?',
			[param.userid,param.limit],
			function(err,result){
				if(err) throw err;

				if(result){
					callback(result);
				}
			}
		);
		connection.release();
	});
};

/**
 * 根据rid获取record详细
 * @param  {[type]}   param    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Record.prototype.getRecordByRid = function(rid,callback){
	pool.getConnection(function(err,connection){
		connection.query(
			'select * from record where rid=?',
			[rid],
			function(err,result){
				if(err) throw err;

				if(result){
					callback(result);
				}
			}
		);
		connection.release();
	});
};

/**
 * 根据rid删除record记录
 * @param  {[type]}   param    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Record.prototype.deleteRecordByRid = function(rid,callback){
	pool.getConnection(function(err,connection){
		connection.query(
			'delete from record where rid=?',
			[rid],
			function(err,result){
				if(err) throw err;
				if(result){
					callback(result);
				}
			}
		);
		connection.release();
	});
};

/**
 * 根据rid更新record记录
 * @param  {[type]}   rid      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Record.prototype.updateRecordByRid = function(callback){
	let self = this;
	pool.getConnection(function(err,connection){
		connection.query(
			'update record set udate=now(),title=?,page=?,music=? where rid=?',
			[self.record.title,self.record.page,self.record.music,self.record.rid],
			function(err,result){
				if(err) throw err;
				if(result){
					callback(result);
				}
			}
		);
		connection.release();
	});
};