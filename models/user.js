var mysql = require('mysql');
var config = require('../conf/config');

var pool = mysql.createPool(config.mysql);

function User(user){
	this.username = user.username;
	this.cellphone = user.cellphone;
	this.password = user.password;
	this.sex = user.sex;
}

module.exports = User;

User.prototype.createUser = function(callback){
	var self = this;
	pool.getConnection(function(err,connection){
		connection.query(
			'insert into user (username,cellphone,password,sex) values (?,?,?,?);',
			[self.username,self.cellphone,self.password,self.sex],
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

User.prototype.getUserByName = function(callback){
	var self = this;
	pool.getConnection(function(err,connection){
		connection.query(
			'select username from user where username="'+self.username+'";',
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

