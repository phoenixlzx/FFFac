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
				$('#shorturl').attr('readonly', 'readonly').val('http://fff.ac/fire').mouseover(selectshort);
				// ajax 
		} 
		else {
			$("#shorturl").animate({
				width: "820px"
			});
			$("#fireshout").animate({
				width: "450px"
			});
			$('#fireshout span:last').fadeOut("fast", fadelong);
			$('#shorturl').attr('placeholder', '烧！烧！烧！').removeAttr("readonly").val(null);
		}
	});
	/* Long to Short  special.ver */
		//not ready
	/* Fire message */
	var sendres = function() {
		$(this).animate({height: '0px'},"fast").fadeIn("fast").animate({height: '500px'},"fast").animate({height: '100%'},"fast");
	}
	var sendready = function() {
	 //put if...else here
		//if success
		$('div#sendsuccess').fadeToggle(1,sendres);
		//else fail
		$('div#sendfail').fadeToggle(1,sendres);
	}
	$('#username').html('example &lt;example@example.com&gt;');
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
		$('div#sendsuccess').fadeOut("fast");
		$('#contact').fadeIn("fast").animate({height: '600px'}).animate({height: '100%'},"fast");
	});
	//send fail
	$('#fireagain').click(function() {
		$('div#sendfail').fadeOut("fast");
		$('#contact').fadeIn("fast").animate({height: '600px'}).animate({height: '100%'},"fast");
	});



//end jquery
});