import urllib  
import urllib2  
import cookielib  


cj = cookielib.CookieJar()  
opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))  
opener.addheaders = [('User-agent','Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)')]  
urllib2.install_opener(opener)  
for i in range(0,1):
	req = urllib2.Request("http://short.catofes.com/server/shorturl.php?function=addurl",urllib.urlencode({"url":"http://xf.catofes.com"}))  
	resp=urllib2.urlopen(req)
	print resp.read();
#req = urllib2.Request("http://short.catofes.com/server/login.php?function=login",urllib.urlencode({"username":"test","passwd":"123"}))  
#resp = urllib2.urlopen(req)  
#print resp.read() 
#print cj
#req = urllib2.Request("http://short.catofes.com/server/shorturl.php?function=addurl",urllib.urlencode({"url":"http://xf.catofes.com"}))  
#resp=urllib2.urlopen(req)
#print resp.read();


