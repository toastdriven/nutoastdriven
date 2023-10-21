---
title: 'NaBloPoMo & Testing Views'
date: '2008-11-01'
time: '14:56:35'
author: 'Daniel'
slug: 'nablopomo-testing-views'
---

<p>Since it's November and it's <a href="http://www.nablopomo.com/">National Blog Posting Month</a>, I'm going to give it a go, despite some other big deadlines. We'll see if how long this lasts.</p>

<p>Let's talk about using <a href="http://www.djangoproject.com/">Django's</a> test client interactively. Let's say you want to simulate a request(s) from the command line as the Django <a href="http://docs.djangoproject.com/en/dev/topics/testing/#module-django.test.client">test client</a> would. This is useful for tracking down what's going wrong in a failing test without messing with test file.</p>

<p>You'll want to fire up a Django shell (<code>./manage.py shell</code> or similar) as normal. BUT, there's an additional piece of setup you'll want to perform to make the shell behave like the test client.</p>

<pre><code class="prettyprint">>>> from django.test.utils import setup_test_environment
>>> setup_test_environment()
</code></pre>

<p>This overrides the standard HttpResponse class, causing extra data, like the context and template used, to be shunted into the response objects just like the test client has. You can then test your views as you normally would, with all data present that would be there in the test client.</p>

<pre><code class="prettyprint">>>> from django.test.utils import setup_test_environment
>>> setup_test_environment()
>>>
>>> from django.test import Client
>>> c = Client()
>>>
>>> r = c.get('/')
>>> r.status_code
200
>>> r.context[0]['greeting']
u'Hello, world!'
</code></pre>