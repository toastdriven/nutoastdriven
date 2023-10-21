---
title: 'Gevent, Long-Polling & You'
date: '2011-07-31'
time: '12:17:52'
author: 'Daniel'
slug: 'gevent-long-polling-you'
---

A big focus lately (as far as web technology trends go) is the move to
"real-time". "Real-time" is a loaded terms that can mean a lot of things to
different people, but what is consistent is people's desire to always have the
latest information, without a lot of effort on their part. Because, let's face
it, funny cat pictures are
[srs bizness](http://news.tubefilter.tv/2011/03/28/know-your-meme-acquired-by-cheezburger-in-seven-figure-deal/).
Regardless of what data **you** want to push, the technique herein might be a
good starting place.

This article is born out of the frustration of trying to find information
on the Internet related to doing long-polling request with a simple WSGI
backend. Many people have talked about this style of setup (such as
[Convore](http://blip.tv/djangocon-europe-2011/monday-1000-eric-florenzano-5308864))
but resources seem scarce. So this is the fruits of my trials to get a
simple messaging daemon setup.

Code available on [GitHub](https://github.com/toastdriven/wsgi_longpolling).


On Long-Polling
---------------

The technique around long-polling essentially just means that, rather than
quickly finishing a request & closing out the connection, the server starts
the response but never closes the connection. To the client, it looks like
things are taking a long time to load, but to the server, you're stalling for
time/data.

In the past, you'd have to fire up many, many processes on the server (one
per client since the connection has to hang open) to be able to long-poll
many clients. However, we can lean on [gevent](http://gevent.org/) &
cooperative multitasking to run a *SINGLE* server, use very little RAM
& serve many clients.

This method is pretty great, because unlike WebSockets (very uneven browser
support) or Flash (ugh), it works in all browsers pretty consistently &
does "push" data very well.


Setup
-----

You'll need ``libevent`` & ``redis``. Since I'm on a Mac, I used
[Homebrew](https://github.com/mxcl/homebrew) to grab them:

    $ brew update
    $ brew install libevent # Installed v2.0.12
    $ brew install redis# Installed v2.2.12

You'll need some packages to get started. I used a ``virtualenv`` to isolate
everything:

    $ mkdir wsgi_longpolling
    $ cd wsgi_longpolling
    $ virtualenv --no-site-packages env
    $ . env/bin/activate

Then I installed the following packages:

    $ ./env/bin/pip install gevent
    $ ./env/bin/pip install redis


Baby Steps Into Long Poll
-------------------------

We'll start out with the simplest Gevent'd WSGI server we can. Virtually straight
out of the docs/examples:

    # wsgi_longpolling/simple.py
    from gevent import pywsgi


    def handle(environ, start_response):
        start_response('200 OK', [('Content-Type', 'text/html')])
        yield '<html><body><h1>Hi There</h1></body></html>'


    server = pywsgi.WSGIServer(('127.0.0.1', 1234), handle)
    print "Serving on http://127.0.0.1:1234..."
    server.serve_forever()

You then run this server with:

    $ ./env/bin/python simple.py

You can now pop a tab in a browser & hit http://127.0.0.1:1234, receiving a
friendly "Hi There" in response.

This will serve up a simple response very quickly, and thanks to gevent, can
handle many clients at a time. We're using ``yield`` here (as opposed to the
standard array returned by convention), as the WSGI spec
demands that an iterable be returned. We'll be using yield more shortly.

However, there's no long-polling here yet. To introduce long-polling, we'll
need to add something that keeps the connection open. We'll put in a simple
delay:

    # wsgi_longpolling/simple_longpoll.py
    import gevent
    from gevent import pywsgi


    def handle(environ, start_response):
        start_response('200 OK', [('Content-Type', 'text/html')])
        yield ' ' * 1200
        yield '<html><body><h1>Hi '
        gevent.sleep(10)
        yield 'There</h1></body></html>'


    server = pywsgi.WSGIServer(('127.0.0.1', 1234), handle)
    print "Serving on http://127.0.0.1:1234..."
    server.serve_forever()

Run it with:

    $ ./env/bin/python simple_longpoll.py

Then reload in your browser. You'll get back a "Hi", a 10 second wait, then
"There" comes back. Congrats on your first long-poll.

You should open another browser (say Safari or Firefox) at the same time.
Reload the page in one browser, wait a second then reload it in the other. You
should get an immediate "Hi" from both, the wait & then the "There".

If we had used ``time.sleep(10)`` instead of ``gevent.sleep(10)``, the process
would have blocked. One browser would have gotten the "Hi" while the other
would have just sat & waited until the first request had finished before
starting.

**Browser Note** - I recommend two different browsers for testing because on
my machine, trying to do two tabs from Chrome actually blocked on responses
from the first tab coming back before the second tab would start loading. Made
it look like something was blocked when in reality it wasn't.

**Browser Note** - You might be wondering about the ``yield ' ' * 1200`` in
there. We flush out a bunch of whitespace at the beginning of the request
because some browsers (like Chrome) will sit & buffer if there isn't enough
data to start with, effectively making the long-poll look like it's not
responding. By sending ~1Kb of whitespace, we force the browser to start
rendering as it gets data.


Better Responses
----------------

As we add complexity, the ``yield`` statements are going to get pretty
unwieldy. By making use of gevent's [Greenlet](http://gevent.org/gevent.html)
& [Queue](http://gevent.org/gevent.queue.html), we can take our logic out of
the function handling requests:

    # wsgi_longpolling/better_responses.py
    from gevent import monkey
    monkey.patch_all()

    import datetime
    import time
    from gevent import Greenlet
    from gevent import pywsgi
    from gevent import queue


    def current_time(body):
        current = start = datetime.datetime.now()
        end = start + datetime.timedelta(seconds=60)

        while current < end:
            current = datetime.datetime.now()
            body.put('<div>%s</div>' % current.strftime("%Y-%m-%d %I:%M:%S"))
            time.sleep(1)

        body.put('</body></html>')
        body.put(StopIteration)


    def handle(environ, start_response):
        start_response('200 OK', [('Content-Type', 'text/html')])
        body = queue.Queue()
        body.put(' ' * 1000)
        body.put("<html><body><h1>Current Time:</h1>")
        g = Greenlet.spawn(current_time, body)
        return body


    server = pywsgi.WSGIServer(('127.0.0.1', 1234), handle)
    print "Serving on http://127.0.0.1:1234..."
    server.serve_forever()

First big change: we've added ``from gevent import monkey; monkey.patch_all()``
to the top of the file. This goes through & monkeypatches Python's stdlib,
"green"-ing the libraries as it goes. For example, this makes ``time.sleep``
a "green" operation (allowing switching to other tasks). You can read more
[here](http://gevent.org/gevent.monkey.html#module-gevent.monkey).

From there, let's start with the ``handle`` function. We've added a
``queue.Queue`` to the mix. Since it exposes an iterable interface, it'll be
perfect for WSGI to return. We push on the extra padding & the start of our
response as usual.

We then spawn a new ``Greenlet``, which will handle the actual logic, and pass
to it the ``body`` we want it to send data to as it gets it. Finally, we return
the ``body`` queue.

The ``Greenlet`` is pretty straightforward. It will sit for a minute in a
``while`` loop. It gets the current ``datetime`` & shoves it into the ``body``
queue. This causes that item to get flushed over the connection gevent is
holding open. It then uses the "greened" ``time.sleep``, taking a nap for a
second. This sleep gives other ``Greenlets`` a chance to run, which you can see
if you open this in multiple browsers.

Finally, we close out the HTML & put a ``StopIteration`` into the queue. This
tells WSGI "hey, there's nothing more to process" & causes the connection to
finally close. Without this, the request would never end, with the queue
silently endless waiting for more data to be placed in it.

If you run the server & load this in browser, you should get a long-polling
response printing out the time every second for a full minute.


Adding in Redis
---------------

Current time is all well & good, but let's hook up a real data source & do
something really useful. We're going to set up a simple system that takes
messages added by the server & distributes them to everyone that's got a
long-poll request open. We're going to use [Redis](http://redis.io/),
specifically the [pubsub](http://redis.io/topics/pubsub) bits.

**Warning** - We're using Redis because it's fast, perfect for this use case &
IMPORTANTLY easy for gevent to "green". Your experience with other libraries
may not be as good, especially database libraries. If you use Postgres,
psycopg2 has a way to enable asynchronous queries.

We're going to create a simple script to add the messages. It doesn't need to
be gevent-enabled, since it'll only be run by one person locally:

    # wsgi_longpolling/messager.py
    import redis

    server = redis.Redis(host='localhost', port=6379, db=0)

    while True:
        message = raw_input("What to say: ")
        server.publish('messages', message)

        if message == 'quit':
            break

We set up a global Redis connection, then sit in a ``while`` loop, with each
iteration getting a new message from the user. It then takes that message &
sends Redis a ``publish`` message. If the message is ``quit``, the
process stops.

The important thing to note here is that it could go anywhere. You could
just as easily embed this in your other applications, such as in a Django
view or a cronjob. This opens what you push to a whole new world of
possibilities.

The server that'll handle the long-poll requests & stream back the messages
from Redis looks like:

    # wsgi_longpolling/pusher.py
    from gevent import monkey
    monkey.patch_all()

    import gevent
    from gevent import pywsgi
    from gevent import queue
    import redis


    def process_messages(body):
        server = redis.Redis(host='localhost', port=6379, db=0)
        client = server.pubsub()
        client.subscribe('messages')
        messages = client.listen()

        while True:
            message = messages.next()
            print "Saw: %s" % message['data']

            if message['data'] == 'quit':
                body.put("Server closed.")
                body.put(StopIteration)
                break

            body.put("<div>%s</div>\n" % message['data'])


    def handle(environ, start_response):
        start_response('200 OK', [('Content-Type', 'text/html')])
        body = queue.Queue()
        body.put(' ' * 1000)
        body.put("<html><body><h1>Messages:</h1>")
        gevent.spawn(process_messages, body)
        return body


    server = pywsgi.WSGIServer(('127.0.0.1', 1234), handle)
    print "Serving on http://127.0.0.1:1234..."
    server.serve_forever()


The ``handle`` function is familiar, so we'll focus on the ``process_messages``
function. We establish a new connection, then start a new ``PubSub`` client
(see also the
[pubsub tests](https://github.com/andymccurdy/redis-py/blob/master/tests/pubsub.py)
for more usage) & subscribe to the ``messages`` channel.

We then sit in the familiar ``while`` loop. We check for a message. If we find
one, we shove it in the queue & sleep. If the message is ``quit``, we add the
``StopIteration`` to the queue & close out the connection.

Pop one shell doing:

    $ redis-server

And another doing:

    $ ./env/bin/python messager.py

And another doing:

    $ ./env/bin/python pusher.py

Refresh your browser then enter messages in your ``messager.py`` shell. You
should see them pushed to the browser. This is most impressive if you fire up
multiple browsers and watch them all get messages.

Video:

<iframe src="http://player.vimeo.com/video/27123492?title=0&amp;byline=0&amp;portrait=0" width="400" height="300" frameborder="0"></iframe><p><a href="http://vimeo.com/27123492">WSGI Long-poll PubSub</a> from <a href="http://vimeo.com/daniellindsley">Daniel Lindsley</a> on <a href="http://vimeo.com">Vimeo</a>.</p>


Conclusion & Credits
--------------------

Beyond this, you can hook up your favorite JS library & do these long-polling
requests via standard Ajax (you may need JSONP in the mix if you'll be
crossing domains/ports). I'm pretty happy, given how short the code is and how
well it works.

Props to:

* [gevent docs](http://gevent.org/contents.html)
* [Redis docs](http://redis.io/commands#pubsub)
* Bottle's [Async docs](http://bottlepy.org/docs/dev/async.html)
* Andy McCurdy's excellent [Redis.py](https://github.com/andymccurdy/redis-py)
* Jeff Triplett & Travis Cline for improvements
