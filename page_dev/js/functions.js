$(document).ready(function() {

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
	var mfirea= function() {
		$('#contact')
			.animate({height: '100px'},"fast")
			.fadeIn(800)
			.animate({height: '540px'},600)
			.animate({height: '100%'},"fast");
	}

	$('#usermail').html('example &lt;example@example.com&gt;');
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

/* user info */
	$('div#wrap div#user')
		.animate({height: '130px'},"fast")
		.fadeIn(600)
		.animate({height: '520px'},600)
		.animate({height: '100%'},"fast");


//end jquery
});