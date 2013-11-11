This is a ReadMe File.
====================================

###Files in Project:
	server/config.php		Global params & Mysql link
	jump.php			Jumpto Page 

###MySQL datebase:

####Table user:
		|username <varchar64>	|id <int>	|passwd <varchar64>	|Email <varchar100>	|level <tinyint>	|
####Table url:
		|id <char12>	|url <text>	|type <tinyint>	|text <TEXT>	|userid	<int>	|
####Table log:
		|time <timestamp>	|action <text>	|
####Table quote:
		|id <int>	|content <text>	|userid <int>|




