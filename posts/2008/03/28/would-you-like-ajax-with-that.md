---
title: 'Would You Like Ajax With That?'
date: '2008-03-28'
time: '20:14:31'
author: 'Daniel'
slug: 'would-you-like-ajax-with-that'
---

<p>A variant of a patch I proposed was added to <a href="http://www.djangoproject.com/" title="Django">Django</a>'s trunk as of a week ago (r7334).  It adds a method to all requests that allow you to check if the request was made via an Ajax call or a vanilla GET by a browser.  A sample of usage might look like:</p>

<pre><code class="prettyprint">def my_friends(request):
    friends = Friend.objects.all()
    
    if request.is_ajax():
        return render_to_response('friends/list_fragment.html', {'friends': friends})
    else:
        return render_to_response('friends/list.html', {'friends': friends})
</code></pre>

<p>There is one caveat to this, which is that your Javascript must send an appropriate header with the request that identifies it as an Ajax request. The good news is that all the major Javascript libraries (<a href="http://jquery.com/" title="jQuery">jQuery</a>, <a href="http://www.prototypejs.org/" title="Prototype">Prototype</a>, <a href="http://developer.yahoo.com/yui/" title="Yahoo! User Interface Library">YUI</a>, <a href="http://mootools.net/" title="MooTools">MooTools</a>, <a href="http://dojotoolkit.org/" title="Dojo">Dojo</a> and others) all already send this header automatically. If not, it's easy to add to your own Javascript code (one line).</p>

<p>Simple as it is, it's a patch that's already been very useful to me and hopefully will be to others as well.</p>