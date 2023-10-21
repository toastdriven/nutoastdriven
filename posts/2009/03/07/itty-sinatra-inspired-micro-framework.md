---
title: 'itty - A Sinatra-inspired micro-framework'
date: '2009-03-07'
time: '15:18:19'
author: 'Daniel'
slug: 'itty-sinatra-inspired-micro-framework'
---

<p>A couple nights ago, I was talking with <a href="http://postneo.com/">Matt</a> and <a href="http://mintchaos.com/">Christian</a>. They were in the
process of looking at <a href="http://heroku.com/">Heroku</a> and <a href="http://sinatrarb.com/">Sinatra</a>. Matt lamented that Sinatra was
perfect for low-level, web service-y things and how it'd be nice if there were
a Python equivalent. Jokingly, they tossed around some fake code samples of what
they were thinking.</p>

<p>I've been thinking about this for a long time now and had followed Sinatra
since its initial release. <a href="http://wsgi.org/">WSGI</a> also gets you a long way toward this goal
(just as Sinatra uses <a href="http://sinatrarb.com/">Rack</a>). I couldn't get it out of my head, so in-between
working on work-related bits, I started throwing together <a href="http://github.com/toastdriven/itty/tree/master">itty</a>.</p>

<h3>What is itty?</h3>

<p><a href="http://github.com/toastdriven/itty/tree/master">itty</a> is a little Python micro-framework, strongly influenced by Sinatra
(though not a port). It's a WSGI app so deployment options are numerous. The
intent is to make basic and/or high-performance web apps, especially web
services.</p>

<p>It is not an extremely serious project (just a fun little hack for me) but it
has worked well so far. It makes no assumptions about what kind of 
ORM/templating/etc. you want to use, you simply plug it in.</p>


<h3>Sample Code</h3>

<p>Since code talks, itty_ code looks like this:</p>

<pre><code class="prettyprint">
from itty import *

@get('/')
def index(request):
    return 'Hello World!'

@get('/hello/(?P<name>\w+)')
def personal_greeting(request, name=', world'):
    return 'Hello %s!' % name

@get('/ct')
def ct(request):
    ct.content_type = 'text/plain'
    return 'Check your Content-Type headers.'

@get('/test_get')
def test_get(request):
    return "'foo' is: %s" % request.GET.get('foo', 'not specified')

@post('/test_post')
def test_post(request):
    return "'foo' is: %s" % request.POST.get('foo', 'not specified')

@get('/test_redirect')
def test_redirect(request):
    raise Redirect('/hello')

run_itty()
</code></pre>

<p>You use various decorators (get/post/put/delete/error) to mark functions that
can handle web requests. Process how ever you need to within those functions.
For output, your function should return a string.</p>

<p>If you're interested, the source is available on <a href="http://github.com/">GitHub</a> as <a href="http://github.com/toastdriven/itty/tree/master">itty</a>. Enjoy!</p>