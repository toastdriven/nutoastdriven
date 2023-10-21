---
title: 'Quick & Dirty Search with Django'
date: '2008-11-09'
time: '22:07:12'
author: 'Daniel'
slug: 'quick-dirty-search-django'
---

<p>There's a lot of options out there for search. You can defer to the big boys like <a href="http://www.google.com/coop/cse/">Google</a>, you can go with the enterprise-y solutions like <a href="http://lucene.apache.org/java/docs/">lucene</a>/<a href="http://lucene.apache.org/solr/">solr</a> and there's plenty more smaller options, like full-text search within your database engine or smaller engines like <a href="http://www.sphinxsearch.com/">Sphinx</a>.</p>

<p>But in the scale of the some of the small sites I've produced, <a href="http://www.djangoproject.com/">Django</a> has an often overlooked option, the <a href="http://docs.djangoproject.com/en/dev/topics/db/queries/#complex-lookups-with-q-objects"><code>Q</code> object</a>. The <code>Q</code> object allows you to perform more difficult queries without leaving the comfort of Django's ORM layer. It allows lets you add simple search to your site without have to configure and run a separate daemon.</p>

<p>Adding it is easy. We'll start with the following code:</p>

<pre><code class="prettyprint">import datetime
from django.db import models


class NewsPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField()
    content = models.TextField()
    posted_date = models.DateTimeField(default=datetime.datetime.now)
</code></pre>

<p>To add search, we'll create a custom <code><a href="http://docs.djangoproject.com/en/dev/topics/db/managers/">Manager</a></code> and add the functionality there. This makes the most sense, as it is consistent with other Manager API usage like <code>filter</code> or <code>get</code>.</p>

<pre><code class="prettyprint">import datetime
import operator
from django.db import models
from django.db.models import Q


class NewsPostManager(models.Manager):
    def search(self, search_terms):
        terms = [term.strip() for term in search_terms.split()]
        q_objects = []
        
        for term in terms:
            q_objects.append(Q(title__icontains=term))
            q_objects.append(Q(content__icontains=term))
        
        # Start with a bare QuerySet
        qs = self.get_query_set()
        
        # Use operator's or_ to string together all of your Q objects.
        return qs.filter(reduce(operator.or_, q_objects))


class NewsPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField()
    content = models.TextField()
    posted_date = models.DateTimeField(default=datetime.datetime.now)
    objects = NewsPostManager()
</code></pre>

<p>Now searching your <code>NewsPost</code>s can be done with a simple call like so:</p>

<pre><code class="prettyprint">results = NewsPost.objects.search("quick search")</code></pre>

<p>There's tons of ways to make simple improvements to this (skip words, customizable attribute search, aggregating searches between models, etc.) but it makes for a simple way to provide basic search without hassle.</p>