const mysql = require('mysql');
const config = require('../conf/config');
const pool = mysql.createPool(config.mysql);

function User(user){
	this.user = user || {};
}

module.exports = User;

/**
 * 创建用户
 * @param  {Function} callback [数据库操作完成回调函数，供路由使用]
 * @return {[type]}            [description]
 */
User.prototype.createUser = function(callback){
	var self = this;
	pool.getConnection(function(err,connection){
		connection.query(
			'insert into user (username,cellphone,password,sex) values (?,?,?,?);',
			[self.user.username,self.user.cellphone,self.user.password,self.user.sex],
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
 * 根据用户名搜索
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
User.prototype.getUserByName = function(callback){
	var self = this;
	pool.getConnection(function(err,connection){
		connection.query(
			'select * from user where username="' + self.user.username + '";',
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
