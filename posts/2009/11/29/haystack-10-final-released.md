---
title: 'Haystack 1.0 Final Released'
date: '2009-11-29'
time: '23:06:06'
author: 'Daniel'
slug: 'haystack-10-final-released'
---

<p>
    Haystack 1.0.0-final has been released (via the packages at 
    <a href="http://pypi.python.org/pypi/django-haystack">PyPi</a> or 
    <a href="http://github.com/toastdriven/django-haystack/downloads">GitHub</a>). 
    You can also install it via ``sudo pip install django-haystack`` or via git 
    from <a href="git://github.com/toastdriven/django-haystack.git">GitHub</a>.
</p>

<p>
    The goal of Haystack is to provide modular search for Django. This means
    pluggable backends (Solr, Whoosh & Xapian currently), a reusable app 
    architecture, the ability to add search to third-party modules without 
    modifying their sources and a flexible codebase
    with many points of extension. The crown jewel is the ``SearchQuerySet``,
    which provides a ``QuerySet``-like interface to your search index. Included
    with the main install is everything needed to get basic search up and 
    running in short order and yet powerful enough to provide search to some
    <a href="http://haystacksearch.org/docs/who_uses.html">decent-sized</a>
    sites. And there's a fair amount of
    <a href="http://haystacksearch.org/docs/">documentation</a> available.
</p>

<p>
    As with Django, Haystack will attempt to remain backward-compatible for the
    duration of the 1.X series, though there are no guarantees on this. Should
    a backward-incompatible change come up, I will post full disclosure on
    the changes on the mailing list as well as the commit itself.
</p>

<p>
    Some fun facts about Haystack's development:
<p>

<ul>
    <li>315 days in development (from first commit to 1.0-final).</li>
    <li>420 public commits with another 100 or so that were squashed.</li>
    <li>27 people in AUTHORS.</li>
    <li>3 complete backends.</li>
    <li>121 closed issues.</li>
</ul>

<p>
    It's been a long ride, especially given I thought I was going to be ready
    to mark it as 1.0 many months sooner. And there are some good features lined 
    up for 1.1, which I'll be starting on shortly. It's been exciting and I'm
    looking forward to what's next. A big thanks to everyone who contributed 
    bug reports and patches.
</p>

<p>
    Finally, the entire project would've been completely impossible without the
    support of my wife Moriah, who graciously accepted the many (late) hours I
    put into Haystack and did lots of editing for me in both the documentation
    and mailing list posts.
</p>