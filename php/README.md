This is a ReadMe File.
====================================

###Files in Project:
	server/config.php		Global params & Mysql link
	server/login.php		Login & Account operate
	server/shorturl.php		Generate short url
	jump.php				Jumpto Page 

###MySQL datebase:

####Table user:
		|username <varchar64>	|id <int>	|passwd <varchar64>	|Email <varchar100>	|level <tinyint>	|
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

	RETURN: code: 101(OK) or error code 
			id:	Userid
			level: User Level (1: normal user 10: admin user)
	
	ERRORCODE:	101 OK
				201 User Not Found
				202 Password Error
				203 User Was Blocked


####shorturl.php



###Code:
####Every Thing is OK:
				101:OK
####Account About				
				201:User Not Found
				202:Password Error
				203:User Was Blocked
####Server About
				301:SQL Error. Please connect admin.
####Grammar About
				401:
