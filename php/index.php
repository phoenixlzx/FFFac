<!DOCTYPE html>
<head>
	<title>FFF传送</title>
	<meta name="keywords" content="FFF传送" />
	<meta charset="utf-8" />
	<link rel="icon" 	   href="image/fff-icon-001.png" />
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/style.css" />

	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="/javascripts/html5shiv.js"></script>
	<script src="/javascripts/respond.min.js"></script>
	<![endif]-->

</head>
<body  background="image/a.png">
<!-- nav bar -->
	<div class="navbar navbar-inverse navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="/"><span class="glyphicon glyphicon-fire firefiresmall"></span>&thinsp;FFF传送</a>
			</div>

			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="/special">特殊传送</a></li>
					<li><a href="/about">关于FFF传送</a></li>
					<li><a href="/contact">联系传送部长</a></li>
				</ul>
				<form class="navbar-form navbar-right">
					<a href='/signup' class="btn btn-warning">加入传送部</a>
					<a href='/login' class="btn btn-success">核对暗号</a>
				</form>
			</div><!--/.nav-collapse -->
		</div>
	</div>
	
<!-- main -->
	<div class="container" id='wrap'>
		<div class="starter-template">
			<form role="form" method="post">
				<div class="form-group">
					<label for="shorturl" class='btn-block header'>
						<img src="image/fff-header.jpg" alt="FFF" width="600" height="250" style='border-radius: 10px;' />
					</label>
					<div id='shortfire'>
						<input type="text" class="form-control longurl" id="shorturl" name='shorturl' placeholder="烧！烧！烧！" autofocus />
					</div>
				</div>
				<button type="button" class="btn btn-lg btn-danger btn-block goshort" id="fireshout">
					<span style="display: inline;">烧死异性恋！</span>
					<span style="display: none;">继续烧！</span>
				</button>
			</form>
		</div>
	</div><!-- /.container -->

<!-- footer -->
	<div id="footer">
		<div class="container">
			<p class="text-muted credit">
				2013&emsp;FFF传送&emsp;
				<span class="glyphicon glyphicon-fire firefiresmall"></span>
				&emsp;我们的事业是正义的！
			</p>
		</div>
	</div>

<!-- Bootstrap-->
	<script src="/js/jquery.min.js"></script>
	<script src="/js/bootstrap.min.js"></script>
	<script src="/js/functions.js"></script>
</body>
</html>
