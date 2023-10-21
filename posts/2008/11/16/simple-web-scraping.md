---
title: 'Simple Web Scraping'
date: '2008-11-16'
time: '23:56:24'
author: 'Daniel'
slug: 'simple-web-scraping'
---

<p>Taking a work-related break from admin topics tonight and tomorrow night. So instead I'd like to introduce simple web scraping, which I have done my fair share of.</p>

<p>In a perfect world, all websites would have easy integration, whether it was via a formalized API, easily parsed documents or feeds via formats like Atom/RSS. We do not live in that world, though many modern websites are beginning to provide these pieces. Unfortunately, many websites (such as government ones) may have interesting data but also only provide the HTML. Fortunately, there are a couple Python modules that can help us get to this data and make our lives a whole lot easier.</p>

<p>First, let's grab the modules we need.</p>

<h3>On Your Mark - httplib2</h3>

<p>I used to be one of those "<code>urllib</code> is good enough for me" types. But after being introduced to <code><a href="http://code.google.com/p/httplib2/">httplib2</a></code>, I am spoiled. If <code>urllib</code> is a pocket knife, <code>httplib2</code> is a death ray living on an orbital space station. Perhaps that's a bit sensationalist, but really, <code>httplib2</code> is really awesome. Happy bits include timeouts, HTTPS, authentication, compression and more.</p>

<p>As it is not part of the Python standard library, getting can be done via <a href="http://peak.telecommunity.com/DevCenter/EasyInstall">easy_install</a>/<a href="http://blog.ianbicking.org/2008/10/28/pyinstall-is-dead-long-live-pip/">pip</a> or via <a href="http://code.google.com/p/httplib2/">Subversion</a>.</p>

<p>Now that we've got the library for transporting the content, let's grab the module we'll use to parse.</p>

<h3>Get Set - BeautifulSoup</h3>

<p>At first, you might be tempted to try to use an XML parser, thinking you may only have to work around a couple cases. Hold off that urge and look into <code><a href="http://www.crummy.com/software/BeautifulSoup/">BeautifulSoup</a></code> instead. <code>BeautifulSoup</code> handles most XHTML/HTML with ease, even when the markup is awful.</p>

<p>Installing <code>BeautifulSoup</code> is as easy to install as <code>httplib2</code>, again either by <a href="http://peak.telecommunity.com/DevCenter/EasyInstall">easy_install</a>/<a href="http://blog.ianbicking.org/2008/10/28/pyinstall-is-dead-long-live-pip/">pip</a> or through <code>BeautifulSoup</code>'s <a href="http://www.crummy.com/software/BeautifulSoup/">website</a>.</p>

<p>We now have the components we need. Let's get parsing.</p>

<h3>Scrape!</h3>

<p>For an example, let's say you want a list of popular/anticipated DVD releases for the week. The website <a href="http://videoeta.com/">VideoETA</a> features a very comprehensive list of new releases each week. However, their RSS feed is only news, not the releases themselves. So we'll scrape their listings for what we need. Here's the code:</p>

<pre><code class="prettyprint">#!/usr/bin/env python
import httplib2
from BeautifulSoup import BeautifulSoup


class PageNotFound(RuntimeError): pass


class DVDReleaseScraper(object):
    def __init__(self, url="http://videoeta.com/week_video.html", timeout=15):
        """
        Sets up a DVDReleaseScraper instance.
        
        url should be a string pointing to the VideoEta Wekk Release url.
        timeout should be an integer for the number of seconds to wait for a response.
        """
        self.url, self.timeout = url, int(timeout)
    
    def fetch_releases(self):
        """
        Fetches the page of DVD releases.
        
        Raises PageNotFound if the page could not successfully retrieved.
        """
        http = httplib2.Http(timeout=self.timeout)
        headers, content = http.request(self.url)
        
        if headers.get('status') != '200':
            raise PageNotFound("Could not fetch listings from '%s'. Got %s." % (self.url, headers['status']))
        
        return content
    
    def parse_releases(self, content):
        """Parse the page and return the releases."""
        soup = BeautifulSoup(content)
        releases = []
        
        raw_releases = soup.findAll('table')[1].find('td').findAll('p')
        
        # Skip the first and last paragraphs, as they are navigation.
        for raw_release in raw_releases[1:-1]:
            if not raw_release.a:
                continue
            
            release_info = {}
            release_info['title'] = raw_release.a.b.contents[0].strip()
            release_info['rating'] = raw_release.contents[2].strip().replace('(', '').replace(')', '')
            
            if raw_release.find('blockquote'):
                release_info['synopsis'] = raw_release.find('blockquote').contents[0].strip()
            else:
                release_info['synopsis'] = ''
            
            releases.append(release_info)
        
        return releases
        
    def get_releases(self):
        """An convenience method to fetch and return releases."""
        content = self.fetch_releases()
        return self.parse_releases(content)


if __name__ == '__main__':
    scraper = DVDReleaseScraper()
    releases = scraper.get_releases()
    
    for x in xrange(0, 5):
        print releases[x]['title']

</code></pre>

<p>A good portion of this script is fairly straightforward. The interesting bits are the <code>fetch_releases</code> and the <code>parse_releases</code> methods. The <code>fetch_releases</code> method simply leverages <code>httplib2</code>, making a standard HTTP request for the URL with a default timeout of 15 seconds. If the page came back alright (status 200 OK), return the content of the page.</p>

<p>The <code>parse_releases</code> method is a little more complex as we dive into <code>BeautifulSoup</code>. We first load up the page content via <code>BeautifulSoup</code>. We then use it to pull out the second <code>table</code> it finds, then the first <code>td</code> within that, then all of the <code>p</code> tags it finds within that. From there, we iterate through all of the paragraphs. If it contains a link (the <code>a</code> tag), we parse it further, grabbing out the title, rating and synopsis if we find it. We strip each of these because they may contain whitespace we probably don't want. Finally, we store this dictionary in our <code>releases</code> list and return that list when we're done.</p>

<p>The result is a Python list of dictionaries, with each dictionary containing the title, rating and (optionally) the synopsis, ready for our use elsewhere! Our scraping is complete.</p>

<h3>Notes About Scraping</h3>

<p>First, be aware that scraping is notoriously fragile, as it depends largely on the exact layout of tags in the content. Since most pages don't change much through time, this usually isn't a huge problem. However, be wary of redesigns and code to handle failures (the example code could have been better in this regard, at the expense of easily seeing how to use <code>BeautifulSoup</code>).</p>

<p>Also, if you're scraping, store/cache the data on your end as much as possible. If you're integrating the data into a website of your own, you should avoid hitting someone else's site on every page request. You'll save network overhead, parsing time, CPU cycles and save on their site as well. This should be a courtesy you should extend to someone providing the data. Either store the scraped data in a database or, at the bare minimum, <code><a href="http://www.python.org/doc/2.5.2/lib/module-pickle.html">pickle</a> it</code> for your use.</p>