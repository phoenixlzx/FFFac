$(document).ready(function() {
/* random nav motd */
	var motdlist = [
		'同志们，高举火把，冲向情侣，为理想献身',
		'天下有情人终成兄妹',
		'壮哉我大FFF团',
		'我们的事业是正义的',
		'烧死异性恋',
		'燃烧吧&thinsp;!&thinsp;圣战日',
		'异端审判',
		'不～可～饶～恕～',
		'让火焰净化一切叛徒',
		'死刑',
		'给予异端者死的制裁',
		'异端审问，开庭',
		'烈焰中舞动的火花，将赐予邪恶异性交往以天罚',
		'烧',
		'圣战不息',
	];
	var motdw = motdlist[Math.floor(Math.random()*motdlist.length)];
 	$('#navmotd').html(motdw + '&thinsp;!&emsp;');
/* userinfo */
	$('*#username').html('example');
	$('*#email').html('&lt;example@example.com&gt;')

/* Long to Short  index.ver */
	var fadeshort = function() {
		$('#fireshout span:last').fadeIn("fast");
	}
	var fadelong = function() {
		$('#fireshout span:first').fadeIn("fast");
	}
	var selectshort = function() {
		$('#shorturl').select();
	}

	$("#fireshout").click(function() {
		if ($('#fireshout span:last').attr("style") === "display: none;") 
			{
				$("#shorturl").animate({width: "450px"});
				$("#fireshout").animate({width: "200px"},'normal',selectshort);
				$('#fireshout span:first').fadeOut("fast", fadeshort);
				$('#shorturl').attr('readonly', 'readonly').val('http://fff.ac/fire').click(selectshort);
				// ajax 
		} 
		else {
			$("#shorturl").animate({width: "820px"});
			$("#fireshout").animate({width: "450px"});
			$('#fireshout span:last').fadeOut("fast", fadelong);
			$('#shorturl').attr('placeholder', '烧！烧！烧！').removeAttr("readonly").val(null);
		}
	});

/* Long to Short  special.ver */


/* about */
	$('div#wrap div#about')
		.animate({height: '155px'},"fast")
		.fadeIn(600)
		.animate({height: '720px'},600)
		.animate({height: '100%'},"fast");

/* Fire message */
	var sendres = function() {
		$(this)
			.animate({height: '0px'},1)
			.fadeIn('fast')
			.animate({height: '500px'},500)
			.animate({height: '100%'},"fast");
	}
	var sendready = function() {
			//if success
				$('div#sendsuccess').animate({height: '0px'},1,sendres);
			//else fail
				$('div#sendfail').animate({height: '0px'},1,sendres);
	}
	var mfirea = function() {
		$('#contact')
			.animate({height: '100px'},"fast")
			.fadeIn(800)
			.animate({height: '540px'},600)
			.animate({height: '100%'},"fast");
	}

	$('#contact').animate({height: '100px'},0,mfirea);
	//send
	$("#firemessage").click(function() {
		$('#fireburn').fadeIn(500).animate({color:"#FF0000"},300);
		$("#contact").animate({height: "0px"},600);
		$('#fireburn').fadeOut(120);
		$('#contact').fadeOut(400,sendready);
	});
	//send success
	$('#morefire').click(function() {
		$('#subject').val(null);
		$('#message').val(null);
		$('div#sendsuccess').fadeOut("fast",mfirea);
	});
	//send fail
	$('#fireagain').click(function() {
		$('div#sendfail').fadeOut("fast",mfirea);
	});

/* account */
	var accountchangeres = function() {
		$(this)
			.fadeIn('fast')
			.animate({height: '500px'},500)
			.animate({height: '100%'},"fast");
	}
	var accountchangeready = function() {
			//if success
				$('div#accountchangesuccess').animate({height: '0px'},1,accountchangeres);
			//else fail
				$('div#accountchangefail').animate({height: '0px'},1,accountchangeres);
	}
	var backaccount = function() {
		$('div.accountform')
			.animate({height: '130px'},"fast")
			.fadeIn(600)
			.animate({height: '520px'},600)
			.animate({height: '100%'},"fast");
	}

	$('div#wrap div.accountform')
		.animate({height: '130px'},"fast")
		.fadeIn(600)
		.animate({height: '520px'},600)
		.animate({height: '100%'},"fast");
	//account change
	$('#accountchange').click(function() {
		$('div.accountform').animate({height: "0px"},600).fadeOut(1,accountchangeready);
	});
	//back account change
	$('#successbackaccount').click(function() {
		$('div#accountchangesuccess').fadeOut("fast",backaccount);
	});
	$('#failbackaccount').click(function() {
		$('div#accountchangefail').fadeOut("fast",backaccount);
	});

/* login */
	var signinready = function() {
			//if success
			/*
				$('div#loginform div.form-group').fadeOut('fast');
				$('#loginsuccess').fadeIn('fast',function(){
					$('div#loginform').animate({height: '45px'},300,function(){
						$('#loginfail').animate({height:'123px'},800,function(){
							window.location = "/special"
						});
					});
				});
			*/
			//else fail
				$('div#loginform div.form-group').fadeOut('fast',function(){
					$('#loginfail').fadeIn('fast',function(){
						$('div#loginform').animate({height: '45px'},400,function(){
							$('#loginsuccess').animate({height:'123px'},1000,function(){
								$('div#loginform').animate({height: '0px'},500,function(){
									$('#loginfail').fadeOut(100,function(){
										$('div#loginform div.form-group').fadeIn(100,function(){
											$('div#loginform').animate({height: '96px'},300).animate({height: '100%'},"fast",function(){
												$('#password').val(null).select();
												$('button#btnsignin').fadeIn('fast');
												$('div#loginform').stop(true);
											});
										});
									});
								});
							});
						});
					});
				});
	}

	$('div#loginform')
		.animate({height: '0px'},300)
		.animate({height: '96px'},400)
		.animate({height: '100%'},"fast");
	//login go
	$('button#btnsignin').click(function() {
		$(this).fadeOut('fast');
		$('div#loginform').animate({height: '0px'},400,signinready);
	});

/* signup */
	var signupready = function() {
			//if success
			/*
				$('div#signupform div.form-group').fadeOut('fast');
				$('#signupsuccess').fadeIn('fast',function(){
					$('div#signupform').animate({height: '45px'},300,function(){
						$('#signupfail').animate({height:'123px'},800,function(){
							window.location = "/special"
						});
					});
				});
			*/
			//else fail
				$('div#signupform div.form-group').fadeOut('fast',function(){
					$('#signupfail').fadeIn('fast',function(){
						$('div#signupform').animate({height: '45px'},800,function(){
							$('#signupsuccess').animate({height:'123px'},1000,function(){
								$('div#signupform').animate({height: '0px'},500,function(){
									$('#signupfail').fadeOut(100,function(){
										$('div#signupform div.form-group').fadeIn(100,function(){
											$('div#signupform').animate({height: '196px'},300).animate({height: '100%'},"fast",function(){
												$('#email').val(null).select();
												$('button#btnsignup').fadeIn('fast');
												$('div#signupform').stop(true);
											});
										});
									});
								});
							});
						});
					});
				});
	}

	$('div#signupform')
		.animate({height: '0px'},300)
		.animate({height: '196px'},400)
		.animate({height: '100%'},"fast");
	//login go
	$('button#btnsignup').click(function() {
		$(this).fadeOut('fast');
		$('div#signupform').animate({height: '0px'},400,signupready);
	});

/* forget password */
	var forgotpwready = function() {
		//if success
		
			$('div#forgotpwform div.form-group').fadeOut('fast');
			$('#forgotpwsuccess').fadeIn('fast',function(){
				$('div#forgotpwform').animate({height: '70px'},300,function(){
					$('button#btnforgotpw').animate({height:'60px'},1500,function(){
							$('div#forgotpwform').animate({height: '0px'},500,function(){
								window.location = "/login"
							})
					});
				});
			});

		//else fail
		/*
			$('div#forgotpwform div.form-group').fadeOut('fast');
			$('#forgotpwfail').fadeIn('fast',function(){
				$('div#forgotpwform').animate({height: '70px'},300,function(){
					$('button#btnforgotpw').animate({height:'60px'},1500,function(){
							$('div#forgotpwform').animate({height: '0px'},500,function(){
								window.location = "/forgot-password"
							})
					});
				});
			});
		*/
	}

	$('div#forgotpwform')
		.animate({height: '0px'},300)
		.animate({height: '49px'},400)
		.animate({height: '100%'},"fast");
	//login go
	$('button#btnforgotpw').click(function() {
		$(this).fadeOut('fast');
		$('div#forgotpwform').animate({height: '0px'},400,forgotpwready);
	});

//end jquery
});