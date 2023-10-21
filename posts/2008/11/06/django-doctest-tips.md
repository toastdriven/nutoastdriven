---
title: 'Django Doctest Tips'
date: '2008-11-06'
time: '22:38:37'
author: 'Daniel'
slug: 'django-doctest-tips'
---

<p>In addition to metadata everywhere, I'm a big fan of testing<super><a href="#footnote_1">1</a></super>. In my day job working on <a href="http://www.ellingtoncms.com/">Ellington</a>, we've made big strides forward in our test coverage and I thought I'd share a couple tips I've learned from that experience as well as my own projects.</p>

<p>I suspect that as the month progresses, <a href="http://www.ericholscher.com/">Eric</a> will provide quite a bit of information of the <code>unittest</code>-style of testing, so I'll leave that to him and instead cover a few points on <code>doctest</code>s.</p>

<p>In my opinion, neither <code>unittest</code> nor <code>doctest</code> are the better testing tool. Each shine in their own way and actually play very nicely together. For intensive testing of low-level functionality, it's hard to beat the organization and customizability that <code>unittest</code>s bring to the table. But where <code>doctest</code>s shine is in function/integration testing, where you can simulate how the lower-level bits will be used in practice. And in the context of <a href="http://www.djangoproject.com">Django</a>, <code>doctest</code>s evaluate much quicker, which is a big deal when you're testing a large suite or continuously testing in a TDD manner.</p>

<p>Using <code>doctest</code>s do come with their own set of issues. In particular, when a failure occurs, it is sometimes difficult to track down where in the tests it occurred. Failures also prevent further execution, so an early error can cause many more to follow, incorrectly representing the number of failures in the test. Here are some ways to deal with these shortcomings.</p>

<h3>1. Locating A Failure</h3>

<p>A very common pattern is to make a request with the <a href="http://docs.djangoproject.com/en/dev/topics/testing/#module-django.test.client">test client</a> then check to see what the HTTP response code would have been. Unfortunately, this code has a habit of looking very similar over time. For example:</p>

<pre><code class="prettyprint">&gt;&gt;&gt; from django.test import Client
&gt;&gt;&gt; c = Client()

&gt;&gt;&gt; r = c.get('/')
&gt;&gt;&gt; r.status_code
200

&gt;&gt;&gt; r = c.get('/blog/')
&gt;&gt;&gt; r.status_code
200

&gt;&gt;&gt; r = c.get('/blog/2008/')
&gt;&gt;&gt; r.status_code
200
</code></pre>

<p>A failure on any of the status code checks will result in printing out only the line that failed (i.e. <code>r.status_code</code>). A common way I deal with this is to repeat the URL I'm requesting as a comment on the <code>r.status_code</code> line. So the example would become:</p>

<pre><code class="prettyprint">&gt;&gt;&gt; from django.test import Client
&gt;&gt;&gt; c = Client()

&gt;&gt;&gt; r = c.get('/')
&gt;&gt;&gt; r.status_code # /
200

&gt;&gt;&gt; r = c.get('/blog/')
&gt;&gt;&gt; r.status_code # /blog/
200

&gt;&gt;&gt; r = c.get('/blog/2008/')
&gt;&gt;&gt; r.status_code # /blog/2008/
200
</code></pre>

<p>Now, when the failure occurs, it's obvious (or more obvious) where it stems from.</p>

<h3>2. Use Conditionals</h3>

<p>Another common error that can crop up is when a failure occurs when processing a form. The normal pattern in the view would be to check if the form is valid, save then redirect. But an error will fall through, presenting the failures to the user. This will cause multiple failures in the doctest if the form's processing is incorrect. Example:</p>

<pre><code class="prettyprint">&gt;&gt;&gt; from django.test import Client
&gt;&gt;&gt; c = Client()

&gt;&gt;&gt; r = c.get('/wall/add/')
&gt;&gt;&gt; r.status_code # /wall/add/
200

&gt;&gt;&gt; r = c.post('/wall/add/', {'name': 'Daniel', 'shout': ''})
&gt;&gt;&gt; r.status_code # /wall/add/
302
&gt;&gt;&gt; r['Location']
'http://testserver/wall/'
</code></pre>

<p>A failure in the form will cause both the <code>r.status_code</code> AND the <code>r['Location']</code> lines to fail, when really there is only one failure causing the problem.</p>

<p>Rather than having to resort to testing this page in the browser, we can provide the programmer with more information to make debugging a failing test here go quickly. We'll conditionally check the <code>r.status_code</code> and supply conditional blocks that make sense based on it.</p>

<pre><code class="prettyprint">&gt;&gt;&gt; from django.test import Client
&gt;&gt;&gt; c = Client()

&gt;&gt;&gt; r = c.get('/wall/add/')
&gt;&gt;&gt; r.status_code # /wall/add/
200

&gt;&gt;&gt; r = c.post('/wall/add/', {'name': 'Daniel', 'shout': ''})
&gt;&gt;&gt; r.status_code # /wall/add/
302
&gt;&gt;&gt; r['Location']
'http://testserver/wall/'
&gt;&gt;&gt; if r.status_code != 302:
...     r['context'][-1]['form'].errors # Or r['context'][0]['form'].errors if you're not using template inheritance...
</code></pre>

<p>Now, if the form's processing fails (no redirect, so hence no 302), the tests will also output the errors from the form. This occurs because we've introduced a test that we know will fail (no output from the form's errors). This makes debugging the form much easier and faster.</p>

<p>As a warning, conditionals like this are slightly fragile, especially if there are other things in your view that could cause a failure. The point is more to introduce the idea of leveraging conditionals on a case by case basis. I also only use this technique when posting data, as that's when the more difficult errors seem to creep in.</p>

<h3>3. Checking Context Variables</h3>

<p>A great way to sanity-check what's happened in your views is to check the values that have been put in your context. Some people prefer to use tests or assertions here, like so:</p>

<pre><code class="prettyprint">&gt;&gt;&gt; from django.test import Client
&gt;&gt;&gt; c = Client()

&gt;&gt;&gt; r = c.get('/acronyms/')
&gt;&gt;&gt; r.status_code # /acronyms/
200
&gt;&gt;&gt; len(r['context'][-1]['acronym_list']) == 5
True
&gt;&gt;&gt; r['context'][-1]['acronym_list'] == ['Ajax', 'ORM', 'MVC', 'TDD', 'PEBKAC']
True
&gt;&gt;&gt; isinstance(r['context'][-1]['form'], SearchForm)
True
</code></pre>

<p>Personally, I prefer to avoid boolean tests and instead output the context variable itself. So this would become:</p>

<pre><code class="prettyprint">&gt;&gt;&gt; from django.test import Client
&gt;&gt;&gt; c = Client()

&gt;&gt;&gt; r = c.get('/acronyms/')
&gt;&gt;&gt; r.status_code # /acronyms/
200
&gt;&gt;&gt; len(r['context'][-1]['acronym_list'])
5
&gt;&gt;&gt; r['context'][-1]['acronym_list']
['Ajax', 'ORM', 'MVC', 'TDD', 'PEBKAC']
&gt;&gt;&gt; type(r['context'][-1]['form'])
<class: myapp.forms.SearchForm>
</code></pre>

<p>While this doesn't represent a major difference in the amount of typing when creating the test, this saves a ton of time when running the tests, as the <code>doctest</code> runner will provide what it got instead of what you were expecting, further reducing the amount of time you spend debugging. If left as it was originally, you only know that the test failed (got <code>False</code> instead of <code>True</code>) and would have to dig in further yourself to find out what was actually returned and how.</p>

<p>In combination with fixtures, checking for correct output is a relatively simple, straightforward task.</p>

<h3>4. Content Type Relations</h3>

<p>One final failing point during testing (which can equally affect both <code>unittest</code>s and <code>doctest</code>s) is the use of content types when relating two models together. Because of the way things are handled as it stands in Django, the order of content types in testing can be different from that of development (or worse, from developer machine to developer machine). This can also happen when using generic relations (because it uses content types and foreign keys). Assume for this example that your <code>User</code> model has a relation to the <code>Favorite</code> model, and that using this, you recently favorited a <code>Friend</code> model.</p>

<pre><code class="prettyprint">&gt;&gt;&gt; from django.test import Client
&gt;&gt;&gt; c = Client()

&gt;&gt;&gt; from django.core.management import call_command
&gt;&gt;&gt; call_command('loaddata', 'myapp_testdata.yaml') #doctest: +ELLIPSIS
Installing yaml fixture 'myapp_testdata' ...
Installed 4 object(s) from 1 fixture(s)

&gt;&gt;&gt; r = c.get('/favorites/')
&gt;&gt;&gt; r.status_code # /favorites/
200
&gt;&gt;&gt; r['context'][-1]['most_recent_favorite']
<Friend: moriah>
</code></pre>

<p>The way to handle this rather-sticky and sometimes sneaky problem is simple. At run time, simply load the correct content type and reprocess your fixture data, correcting the content type as you go.</p>

<pre><code class="prettyprint">&gt;&gt;&gt; from django.test import Client
&gt;&gt;&gt; c = Client()

&gt;&gt;&gt; from django.core.management import call_command
&gt;&gt;&gt; call_command('loaddata', 'myapp_testdata.yaml') #doctest: +ELLIPSIS
Installing yaml fixture 'myapp_testdata' ...
Installed 4 object(s) from 1 fixture(s)

# Fix the CTs.
&gt;&gt;&gt; from django.contrib.contenttypes.models import ContentType
&gt;&gt;&gt; from myapp.models import Favorite
&gt;&gt;&gt; friend_ct = ContentType.objects.get(app_label='myapp', model='Friend')
&gt;&gt;&gt; for fav in Favorite.objects.all():
...     # We thought the CT id was 3, but at run-time it is 5...
...     if fav.content_type_id == 3:
...         fav.content_type = friend_ct.id
...         fav.save()

&gt;&gt;&gt; r = c.get('/favorites/')
&gt;&gt;&gt; r.status_code # /favorites/
200
&gt;&gt;&gt; r['context'][-1]['most_recent_favorite']
<Friend: moriah>
</code></pre>

<p>Now your tests will pass, regardless of what order apps/models were installed in on the machine running the tests.</p>

<h3>Conclusion</h3>

<p>Hopefully this gives you some ways to manage complex doctests and to speed up the debugging process when using <code>doctest</code>s. For further reading, I highly recommend <a href="http://docs.djangoproject.com/en/dev/topics/testing/#writing-doctests">Django's doctest</a> documentation as well as <a href="http://docs.python.org/lib/module-doctest.html">Python's doctest</a> documentation. There's lots more that can be done with this flexible, simple tool.</p>

<hr>

<p><small><a name="footnote_1">1</a> - The name of my site/company/whatever is actually a play on Test Driven Development. I like it that much.</small></p>