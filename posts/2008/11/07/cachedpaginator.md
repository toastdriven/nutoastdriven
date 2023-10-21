---
title: 'CachedPaginator'
date: '2008-11-07'
time: '21:07:10'
author: 'Daniel'
slug: 'cachedpaginator'
---

<p>Another quickie tonight in favor of crunch time at work. In a specific use case of <a href="http://www.ellingtoncms.com/">Ellington</a>, we have a list of objects that is very expensive to generate and is requested very frequently. To help allievate this pain-point, I wrote a fairly straightforward subclass of the standard <a href="http://www.djangoproject.com/">Django</a> <code><a href="http://docs.djangoproject.com/en/dev/topics/pagination/">Paginator</a></code> that caches that list of objects on a page by page basis.</p>

<p>Usage of the <code><a href="http://www.djangosnippets.org/snippets/1173/">CachedPaginator</a></code> is almost identical to that of the standard <code>Paginator</code>, with the exception of an extra required argument for the cache key and an optional argument for the cache timeout.</p>

<pre><code class="prettyprint">from django.core.paginator import InvalidPage
from django.http import Http404
from django.shortcuts import render_to_response
from myapp.models import ExpensiveModel
from myapp.paginator import CachedPaginator

def my_view(request):
    cache_key = 'wont_someone_please_think_of_the_servers'
    # Cache for 10 minutes by default unless we've specified a different amount.
    cache_timeout = getattr(settings, 'EXPENSIVE_MODEL_TIMEOUT', 600)
    
    expensive_object_list = ExpensiveModel.objects.run_crazy_query()
    
    paginator = CachedPaginator(expensive_object_list, 20, cache_key, cache_timeout)
    
    try:
        page = paginator.page(request.GET.get('page', 1))
        object_list = page.object_list
    except InvalidPage:
        raise Http404("Invalid page requested.")
    
    return render_to_response('awesome_template.html, {
        'paginator': paginator,
        'page': page,
        'object_list': object_list,
    })
</code></pre>

<p>The source can be found at <a href="http://www.djangosnippets.org/snippets/1173/">http://www.djangosnippets.org/snippets/1173/</a>. <a href="http://www.postneo.com/">Matt Croydon</a> (who happens to be a pretty awesome boss and extremely supportive of open source) gave me permission to release this code under the MIT license, so feel free to use it in your own projects as you see fit.</p>