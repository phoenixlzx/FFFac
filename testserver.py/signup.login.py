import urllib  
import urllib2  
import cookielib  

cj = cookielib.CookieJar()  
opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))  
opener.addheaders = [('User-agent','Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)')]  
urllib2.install_opener(opener)  
req = urllib2.Request("http://short.catofes.com/server/login.php?function=signup",urllib.urlencode({"username":"abtttt's","passwd":"123","email":"trangebnt.tk@gmail.co"}))  
resp = urllib2.urlopen(req)  
print resp.read() 
print cj

