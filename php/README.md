This is a ReadMe File.
====================================

###Files in Project:
	server/config.php		Global params & Mysql link
	server/login.php		Login & Account operate
	server/shorturl.php		Generate short url
	jump.php				Jumpto Page 

###MySQL datebase:

####Table user:
		|username <varchar64>	|id <int>	|passwd <varchar64>	|email <varchar100>	|level <tinyint>	|emailvalid <tinyint>	|
####Table url:
		|id <char12>	|url <text>	|type <tinyint>	|text <TEXT>	|userid	<int>	|
####Table log:
		|time <timestamp>	|action <text>	|
####Table quote:
		|id <int>	|content <text>	|userid <int>|

###Api
	
####login.php

1. login

	login.php?function=login
	
	POST: username: abc
		  passwd:	123

	RETURN: code: xxx 
			id:	Userid
			level: User Level (1: normal user 10: admin user)
	
	CODE:	101 201 202 203 

2. logout

	login.php?function=logout

	POST: NULL

	RETURN:	code:	xxx

	CODE:	101 204

3. checklogin
	
	login.php?function=checklogin

	POST: NULL

	RETURN:	code:	xxx
			username:	abc
			userid:	123
			level:	123

	CODE: 101 204

4. signup
	
	login.php?function=signup

	POST:	username:	abc
			passwd:	xxx
			email:	abc@efd.com

	RETURN:	code:	xxx
			userid:	123
			username:	abc
			email:	abc@efd.com

	CODE: 101 205 206 207 301 401 403

5. resetpasswd


6. requirevalidemail

	login.php?function=requirevalidemail

	POST: NULL

	RETURN: code: xxx
			email: abc@edf.com

	CODE: 101 201 204 208 302 303

7. changepasswd

	login.php?function=changepasswd

	POST:	oldpasswd: aaa
			newpasswd: bbb

	RETURN: code: xxx

	CODE: 101 301 202 201 204

8. sendpasswdreset

	login.php?function=sendpasswdreset

	POST:	username: aaa
			email:	aaa@bbb.com

	RETURN: code: xxx

	CODE: 101 201 209 302 303 301

####shorturl.php

1. addurl
	
	shorturl.php?function=addurl
	
	POST: url : http://a.com

	RETURN:	code: xxx
			id:	urlid
			url:	url

	CODE:	101 301 402

2. addspecialurl

3. listurl

4. deleteurl

5. editurl

####quote.php

1. addquote

2. listquote

3. deletequote

####admin.php

1. adduser

2. edituser

3. deleteuser


###Code:
####Every Thing is OK:
				101:OK 一切正常
####Account About				
				201:User Not Found 没有这个用户
				202:Password Error 密码错误
				203:User Was Blocked 用户被禁用
				204:User Didn't Login 用户没有登录
				205:Signup Disallow by admin 本站关闭注册
				206:Username is in use 用户名已被占用
				207:Email is in use Email已被占用
				208:Email has been valided. Email已经过验证
				209:Email is not correct Email与用户并不对应
####Server About
				301:SQL Error. Please connect admin. SQL错误
				302:Mail Send Error. 邮件发送错误
				303:Code Generate Error. Also with 301. 验证码生成错误
####Grammar About
				401:username format error 用户名不合法
				402:url format error url地址不合法
				403:email format error 邮件地址不合法
####Other About:
				501:Code isn't use for what you want 验证码有误
				502:Code has expired. 验证码已经过期
				503:I don't know why? 我操，为嘛会出错了？
				504:Code is error. 验证码无效
