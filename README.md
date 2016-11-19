# express
一个WebAPP小作品，使用nodejs开发，mysql数据库
####已完成的主要功能：
- 登录/注册
- 登录之后可编辑作品页面，编辑页面有一些动态canvas背景模板可供预览并选择
- 可编辑音乐，文字段落，每个段落的不同动画方式等，目前可供选择的音乐和动画模板还比较少
- 编辑的页面可保存，进入自己的主页可浏览作品集

***
###
###1.构建nodejs环境
    下载安装nodejs,并且安装如下插件：
    npm install express -g
    npm install express-generator -g
    npm install supervisor -g  //代码调试利器
    安装完成之后输入 express -V 验证express是否安装成功
###2.建表，使用mysql数据库
```SQL
//创建用户表
CREATE TABLE IF NOT EXISTS user(
	id INT(10) AUTO_INCREMENT,
	username VARCHAR(20) NOT NULL,
	cellphone VARCHAR(20) NOT NULL,
	password VARCHAR(50) NOT NULL,
	sex INT(1) NOT NULL,
	PRIMARY KEY(id)
)ENGINE=INNODB DEFAULT CHARSET = UTF8;

//创建作品表
CREATE TABLE IF NOT EXISTS record2(
	rid INT(10) AUTO_INCREMENT,
	uid INT(10) NOT NULL,
	cdate DATETIME NOT NULL,
	udate DATETIME NOT NULL,
	title VARCHAR(50),
	page VARCHAR(2000),
	music VARCHAR(50),
	open INT(1),
	PRIMARY KEY(rid)
)ENGINE=INNODB DEFAULT CHARSET = UTF8;
```
###3.完成之后进入项目根目录，在控制台输入 supervisor ./bin/www , 在浏览器端输入localhost:3000即可进入页面
