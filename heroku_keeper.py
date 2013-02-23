import time
import urllib2

url = 'http://www.codehere.co'
while True:
  urllib2.urlopen(url)
	time.sleep(10000)
