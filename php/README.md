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

5. resetpasswd

6. validemail

7. checkpasswd

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
				101:OK
####Account About				
				201:User Not Found
				202:Password Error
				203:User Was Blocked
				204:User Didn't Login
####Server About
				301:SQL Error. Please connect admin.
####Grammar About
				401:username format error
				402:url format error
