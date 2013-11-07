$(document).ready(function(){

	/* Long to Short */
	var fadeshort = function(){$('#fireshout span:last').fadeIn("fast");}
	var fadelong = function(){$('#fireshout span:first').fadeIn("fast");}
	$("#fireshout").click(function(){
		if ($('#fireshout span:last').attr("style")==="display: none;")
			{
				$("#shorturl").animate({width:"450px"});
				$("#fireshout").animate({width:"200px"});
				$('#fireshout span:first').fadeOut("fast",fadeshort);
				$('#shorturl').attr('placeholder','FFF！');
			}
		else
			{
				$("#shorturl").animate({width:"820px"});
				$("#fireshout").animate({width:"450px"});
				$('#fireshout span:last').fadeOut("fast",fadelong);
				$('#shorturl').attr('placeholder','烧！烧！烧！');
			}
	});

	/* Fire message */
	var firelight = "<span class='glyphicon glyphicon-fire firefire'></span>";       
	$("#firemessage").click(function(){
		
		$("#wrap #contact").animate({height:"0px"});
		$("#fireshout").animate({width:"200px"});
		$('#fireshout span:first').fadeOut("fast",fadeshort);
		$('#shorturl').attr('placeholder','FFF！');
	});

});
