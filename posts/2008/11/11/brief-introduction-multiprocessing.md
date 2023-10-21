---
title: 'A Brief Introduction To Multiprocessing'
date: '2008-11-11'
time: '23:16:06'
author: 'Daniel'
slug: 'brief-introduction-multiprocessing'
---

<p>Parallel processing has been getting increasing attention lately online, and with good reason. As CPU manufacturers start adding more and more cores to their processors, creating parallel code is a great way to improve performance. There are a lot of options out there for parallel development (such as functional languages or developer toolkits). However, if you have a substantial codebase already in Python, you have a relatively new option to help you get into parallel programming.</p>

<p>Along with the release of <a href="http://www.python.org/">Python</a> 2.6 came a new module called <code><a href="http://www.python.org/doc/2.6/library/multiprocessing.html"></a>multiprocessing</code>. The <code>multiprocessing</code> module lets you write parallelized code using processes in relatively simple code. By leveraging system processes instead of threads, <code>multiprocessing</code> lets you avoid issues like the <a href="http://www.python.org/doc/2.5.2/api/threads.html"><acronym title="Global Interpreter Lock">GIL</acronym></a>.</p>

<p>For those of us still on Python 2.5, some kind souls backported the library (with sources available on <a href="http://code.google.com/p/python-multiprocessing/">Google Code</a> and the <a href="http://pypi.python.org/pypi/multiprocessing/2.6.0-0.1">Cheeseshop</a>) to Python 2.4/2.5. It has no dependencies I am aware of and installed cleanly/easily on the first try. As a warning, there are occasional small API differences (such as 2.6's <code>applyAsync</code> is <code>apply_async</code> in 2.5) so if something's not working right, <code>dir()</code> and <code>help()</code> in a shell are your friends.</p>

<p>This post assumes you have a little bit of an idea about important concepts in parallel programming (avoiding global/shared state, locking, units of work, etc). Finally, please understand I am not an expert on this subject, just an enthusiast playing with interesting code. Let's cover some basics first, then we'll look at a complete working program.</p>

<h3>Processes, Queues and Locks, Oh My!</h3>

<p>The <code>multiprocessing</code> module comes with plenty of built-in options for building a parallel application. But the three most basic (and safest) are the <code>Process</code>, <code>Queue</code> and <code>Lock</code> classes. Since the <code>Process</code> is the central figure in this story, it's important to understand what it is and what it does.</p>

<h3>Processes</h3>

<p>The <code>Process</code> is an abstraction that sets up another (Python) process, provides it code to run and a way for the parent application to control execution. Common usage is pretty simple:</p>

<pre><code class="prettyprint">from multiprocessing import Process

def say_hello(name='world'):
    print "Hello, %s" % name

p = Process(target=say_hello)
p.start()
p.join()
</code></pre>

<p>We import the <code>Process</code> class, create a function the process will run, then instantiate a <code>Process</code> object with the function it should run. Nothing has happened yet and won't until we tell it to begin via <code>p.start()</code>. The process will run and return it's result. Finally, we tell the process to complete via <code>p.join()</code>. <em>NOTE</em> - Without the <code>p.join()</code>, the child process will sit idle and not terminate, becoming a zombie you must manually kill. If you want to pass arguments to the function, simply provide a <code>args</code> keyword argument like so:</p>

<pre><code class="prettyprint">from multiprocessing import Process

def say_hello(name='world'):
    print "Hello, %s" % name

p = Process(target=say_hello, args=('Daniel',))
p.start()
p.join()
</code></pre>

<p>You can create as many processes as you like/need, but be aware that there is a limit on which adding more processes will increase performance that is NOT constant between computer (as the number of cores, system scheduler and other factors will vary). You'll likely want to build in customizable settings in this regard.</p>

<h3>Queues</h3>

<p><code>Queue</code> objects are exactly what they sound like: a thread/process safe, <acronym title="First In, First Out">FIFO</acronym> data structure. They can store any pickle-able Python object (though simple ones are best) and are extremely useful for sharing data between processes. Usage is easy:</p>

<pre><code class="prettyprint">from multiprocessing import Queue

q = Queue()

q.put('Why hello there!')
q.put(['a', 1, {'b': 'c'}])

q.get() # Returns 'Why hello there!'
q.get() # Returns ['a', 1, {'b': 'c'}]
</code></pre>

<p><code>Queue</code>s are especially useful when passed as a parameter to a <code>Process</code>' target function to enable the <code>Process</code> to consume (or return) data.</p>

<h3>Locks</h3>

<p>Like <code>Queue</code> objects, <code>Lock</code>s are relatively straightforward. They allow your code to claim the lock, blocking other processes from executing similar code until the process has completed and release the lock. Again, simple usage:</p>

<pre><code class="prettyprint">from multiprocessing import Lock

l = Lock()

l.acquire()
print 'Ha! Only I can write to stdout!'
l.release()
</code></pre>

<p>With that, we have all the basic building blocks we need to write a simple <code>multiprocessing</code> application.</p>

<h3>A Simple Application</h3>

<p>Being someone who maintains multiple websites, it'd be useful to have a tool to monitor my sites' statuses (I know other better tools exist, bear with me). Combined with <code>httplib2</code> (which will be involved in another near-future post), we can build a simple app that does this. First, the complete source:</p>

<pre><code class="prettyprint">#!/usr/bin/env python
import httplib2
from multiprocessing import Lock, Process, Queue, current_process


def worker(work_queue, done_queue):
    try:
        for url in iter(work_queue.get, 'STOP'):
            status_code = print_site_status(url)
            done_queue.put("%s - %s got %s." % (current_process().name, url, status_code))
    except Exception, e:
        done_queue.put("%s failed on %s with: %s" % (current_process().name, url, e.message))
    return True


def print_site_status(url):
    http = httplib2.Http(timeout=10)
    headers, content = http.request(url)
    return headers.get('status', 'no response')


def main():
    sites = (
        'http://penny-arcade.com/',
        'http://reallifecomics.com/',
        'http://sinfest.net/',
        'http://userfriendly.org/',
        'http://savagechickens.com/',
        'http://xkcd.com/',
        'http://duelinganalogs.com/',
        'http://cad-comic.com/',
        'http://samandfuzzy.com/',
    )
    workers = 2
    work_queue = Queue()
    done_queue = Queue()
    processes = []
    
    for url in sites:
        work_queue.put(url)
    
    for w in xrange(workers):
        p = Process(target=worker, args=(work_queue, done_queue))
        p.start()
        processes.append(p)
        work_queue.put('STOP')
    
    for p in processes:
        p.join()
    
    done_queue.put('STOP')
    
    for status in iter(done_queue.get, 'STOP'):
        print status


if __name__ == '__main__':
    main()
</code></pre>

<p>We can write this script mostly as we would a single process status checker. The <code>print_site_status</code> function does exactly what we'd normally have it do. In our <code>main()</code>, we simply define a list of sites we want to check (in this case, some of my favorite webcomics).</p>

<p>We place these URLs in a <code>Queue</code> so that our processes have a common source they can remove URLs from and check. We then create and start the number of processes we want, storing them in a list for controlling in the future (you may also want to read up on <code>Pool</code>s in the <code>multiprocessing</code> documentation). Finally, after we've started all of our processes and they're churning away at URLs, we add a 'STOP' sentinel for each of our processes and then tell the processes to <code>join</code>.</p>

<p>Each process places the result of its efforts in the <code>done_queue</code> and once all other processing is done and the child processes have exited, we iterate through the <code>done_queue</code> and print out the results.</p>

<h3>Conclusion</h3>

<p>Hopefully, this has been a helpful brief introduction to parallel programming with Python. I have noticed a few idiosyncrasies with the backported version of <code>multiprocessing</code> (an early version of the code used locks and simply printed the status to the screen, avoiding the use of a done_queue, but would periodically fail in 2.5 only), but am overall impressed with how relatively easy it is to use given the typical difficulties experienced with parallel code.</p>

<p>And there are tons of applications of these techniques, especially in the web world. Everything from spiders (like the one our <a href="http://8bitb.us/">sys admin</a> wrote) to search indexers to API scrapers and beyond, there's lots of potential.</p>