$(document).ready(function() {
/* random nav motd */
	var motdlist = [
		'同志们，高举火把，冲向情侣，为理想献身',
		'天下有情人终成兄妹',
		'壮哉我大FFF团',
		'我们的事业是正义的',
		'烧死除兄妹外所有异性恋',
		'燃烧吧&thinsp;!&thinsp;圣战日',
		'异端审判',
		'不～可～饶～恕～',
		'让火焰净化一切叛徒',
		'给予异端者死的制裁',
		'异端审问会，开庭',
		'烈焰中舞动的火花，将赐予邪恶异性交往以天罚',
		'圣战不息',
	];
	var motdnav = motdlist[Math.floor(Math.random()*motdlist.length)];
	var motdhead = motdlist[Math.floor(Math.random()*motdlist.length)];
	$('#navmotd').html(motdnav + '&thinsp;!&emsp;');
	$('#headmotd').html(motdhead);
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
				// ajax
                $.ajax({
                    type: "POST",
                    url: 'geturi',
                    data: {"longurl": $('#shorturl').val()},
                    success: function(data) {
                        $('#shorturl').attr('readonly', 'readonly').val('http://fff.ac/' + data).click(selectshort);
                    },
                    error: function(data) {
                        $('#shorturl').attr('readonly', 'readonly').val('Error...' + data.responseText).click(selectshort);
                    }
                });
		} 
		else {
			$("#shorturl").animate({width: "820px"});
			$("#fireshout").animate({width: "450px"});
			$('#fireshout span:last').fadeOut("fast", fadelong);
			$('#shorturl').removeAttr("readonly").val(null).attr('placeholder', '烧！烧！烧！');
		}
	});

/* Long to Short  special.ver */
	//idn means record-id-namber
		//change record
		$("button#change-record-idn").click(function(){
			var longrecord_idn = $('#record-long-idn').text()
			var shortrecord_idn = $('#record-short-idn').text()
			$("td#record-long-idn")
				.attr('style','padding:4px')
				.wrapInner("<input type='text' id='record-long-change-idn' class='form-control input-sm' name='record-long-change-idn' value=" + longrecord_idn + " />");
			$("td#record-short-idn")
				.attr('style','padding:4px')
				.wrapInner("<input type='text' id='record-short-change-idn' class='form-control input-sm' name='record-short-change-idn' value=" + shortrecord_idn + " />");
			$(this).fadeOut(10,function(){
				$('button#do-change-record-idn').fadeIn(10);
			});
		});
		$("button#do-change-record-idn").click(function(){
			var record_long_change_idn = $('#record-long-change-idn').val()
			var record_short_change_idn = $('#record-short-change-idn').val()
			//ajax
			$("input#record-long-change-idn").replaceWith(record_long_change_idn);
			$("input#record-short-change-idn").replaceWith(record_short_change_idn);
			$("td#record-long-idn").removeAttr('style');
			$("td#record-short-idn").removeAttr('style');
			$(this).fadeOut(10,function(){
				$('button#change-record-idn').fadeIn(10);
			});
		});
		// delete record
		$("button#fire-record-idn").click(function(){
			//ajax
			$('tr#record-row-idn').detach().remove().empty();
		});
		//new record
			// orz

/* userlist */
	//idn means user-id-namber
		//change record
		$("button#change-user-idn").click(function(){
			var iduser_idn = $('#user-id-idn').text()
			var mailuser_idn = $('#user-mail-idn').text()
			var permissionsuser_idn = $('#user-permissions-idn').text()
			$("td#user-id-idn")
				.attr('style','padding:4px')
				.wrapInner("<input type='text' id='user-id-change-idn' class='form-control input-sm' name='user-id-change-idn' value=" + iduser_idn + " />");
			$("td#user-mail-idn")
				.attr('style','padding:4px')
				.wrapInner("<input type='text' id='user-mail-change-idn' class='form-control input-sm' name='user-mail-change-idn' value=" + mailuser_idn + " />");
			$("td#user-permissions-idn")
				.attr('style','padding:4px')
				.wrapInner("<input type='text' id='user-permissions-change-idn' class='form-control input-sm' name='user-permissions-change-idn' value=" + permissionsuser_idn + " />");
			$(this).fadeOut(10,function(){
				$('button#do-change-user-idn').fadeIn(10);
			});
		});
		$("button#do-change-user-idn").click(function(){
			var user_id_change_idn = $('#user-id-change-idn').val()
			var user_mail_change_idn = $('#user-mail-change-idn').val()
			var user_permissions_change_idn = $('#user-permissions-change-idn').val()
			//ajax
			$("input#user-id-change-idn").replaceWith(user_id_change_idn);
			$("input#user-mail-change-idn").replaceWith(user_mail_change_idn);
			$("input#user-permissions-change-idn").replaceWith(user_permissions_change_idn);
			$("td#user-id-idn").removeAttr('style');
			$("td#user-mail-idn").removeAttr('style');
			$("td#user-permissions-idn").removeAttr('style');
			$(this).fadeOut(10,function(){
				$('button#change-user-idn').fadeIn(10);
			});
		});
		// delete record
		$("button#fire-user-idn").click(function(){
			//ajax
			$('tr#user-row-idn').detach().remove().empty();
		});
		//new record
			// orz

/* about */
	$('div#wrap div#about')
		.animate({height: '155px'},"fast")
		.fadeIn(600)
		.animate({height: '710px'},600)
		.animate({height: '100%'},"fast");

/* Fire message */
	var sendres = function() {
		$(this)
			.animate({height: '0px'},1)
			.fadeIn('fast')
			.animate({height: '490px'},600)
			.animate({height: '100%'},"fast");
	}
	var sendready = function() {
			//if success
				$('div#sendsuccess').animate({height: '0px'},1,sendres);
			//else fail
				//$('div#sendfail').animate({height: '0px'},1,sendres);
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
		//ajax
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
			.animate({height: '460px'},600)
			.animate({height: '100%'},"fast");
	}
	var accountchangeready = function() {
			//if success
				$('div#accountchangesuccess').animate({height: '0px'},1,accountchangeres);
			//else fail
				//$('div#accountchangefail').animate({height: '0px'},1,accountchangeres);
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
		$('div.accountform').animate({height: "0px"},600);
		//ajax
		$('div.accountform').fadeOut(1,accountchangeready);
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
		//ajax
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
		//ajax
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
		//ajax
		$('div#forgotpwform').animate({height: '0px'},400,forgotpwready);
	});

//end jquery
});