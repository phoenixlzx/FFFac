$(document).ready(function() {
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
		if ($('#fireshout span:last').attr("style") === "display: none;") {
				$("#shorturl").animate({width: "450px"});
				$("#fireshout").animate({width: "200px"},'normal',selectshort);
				$('#fireshout span:first').fadeOut("fast", fadeshort);

		} 
		else {
			$("#shorturl").animate({width: "820px"});
			$("#fireshout").animate({width: "450px"});
			$('#fireshout span:last').fadeOut("fast", fadelong);
			$('#shorturl').attr('placeholder', '烧！烧！烧！').removeAttr("readonly").val(null);
		}
	});

/* Long to Short  special.ver */
	var fadeshortsp = function() {
		$('#fireshoutsp span:last').fadeIn("fast");
	}
	var fadelongsp = function() {
		$('#fireshoutsp span:first').fadeIn("fast");
	}
	var selectshortsp = function() {
		$('#shorturlsp').select();
	}

	$("#fireshoutsp").click(function() {
		if ($('#fireshoutsp span:last').attr("style") === "display: none;") 
			{
				$("#shorturlsp").animate({width: "450px"});
				$("#fireshoutsp").animate({width: "200px"},'normal',selectshortsp);
				$('#fireshoutsp span:first').fadeOut("fast", fadeshortsp);
				$('#shorturlsp').attr('readonly', 'readonly').val('http://fff.ac/firesp').click(selectshortsp);
				// ajax 
		} 
		else {
			$("#shorturlsp").animate({width: "820px"});
			$("#fireshoutsp").animate({width: "450px"});
			$('#fireshoutsp span:last').fadeOut("fast", fadelongsp);
			$('#shorturlsp').attr('placeholder', 'F！F！F！').removeAttr("readonly").val(null);
		}
	});

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

	$('div#wrap div.accountform').animate({height: '130px'},"fast").fadeIn(600).animate({height: '520px'},600).animate({height: '100%'},"fast");
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
				//$('div#loginform div.form-group').fadeOut('fast');
				//$('#loginsuccess').fadeIn('fast',function(){$('div#loginform').animate({height: '45px'},300);});
				//jump to special page
			//else fail
				$('div#loginform div.form-group').fadeOut('fast',function(){
					$('#loginfail').fadeIn('fast',function(){
						$('div#loginform').animate({height: '45px'},400,function(){
							$('#loginsuccess').animate({height:'123px'},800,function(){
								$('div#loginform').animate({height: '0px'},600,function(){
									$('#loginfail').fadeOut(100,function(){
										$('div#loginform div.form-group').fadeIn(100,function(){
											$('div#loginform').animate({height: '96px'},300).animate({height: '100%'},"fast",function(){
												$('#password').val(null).select();
												$('button#btnsignin').fadeIn('fast');
											});
										});
									});
								});
							});
						});
					});
				});
	}

	$('div#loginform').animate({height: '0px'},300).animate({height: '96px'},400).animate({height: '100%'},"fast");
	//login go
	$('button#btnsignin').click(function() {
		$(this).fadeOut('fast');
		$('div#loginform').animate({height: '0px'},400,signinready);
	});


//end jquery
});