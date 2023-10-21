---
title: 'Announcing Haystack - Modular search for Django'
date: '2009-04-16'
time: '11:24:48'
author: 'Daniel'
slug: 'announcing-haystack-modular-search-django'
---

<p>
    Search has long been a slightly painful affair within the
    <a href="http://www.djangoproject.com/">Django</a> community. There have been
    numerous attempts at search, each with a different API and feature set. People
    who are new to the community have no easy/obvious option and switching to a
    different search engine can be a painful experience.
</p>

<p>
    Long frustrated by this situation, I've been working on a solution since the
    beginning of this year. It's called
    <a href="http://haystacksearch.org/">Haystack</a>.
</p>

<h2>What is Haystack?</h2>

<p>
    <a href="http://haystacksearch.org/">Haystack</a> is a modular search
    framework for Django. It works directly with Django <code>Models</code> and
    provides a familiar API to people who are comfortable with Django. It features:
</p>

<ul>
    <li>Pluggable backends (Solr &amp; Whoosh to start with, with more in the works)</li>
    <li>A familiar API to that resembles Django where appropriate</li>
    <li>Easy integration with third party applications</li>
    <li>A loosely coupled architecture that allows for parts to be interchanged</li>
    <li><a href="http://haystacksearch.org/docs/">Documentation</a></li>
    <li>Test coverage</li>
</ul>

<p>Further, where backends support it, it also features:</p>

<ul>
    <li>Automatic query generation</li>
    <li>Term boosting</li>
    <li>"More Like This"</li>
    <li>Faceting</li>
    <li>Highlighting</li>
</ul>

<h2>How complete is Haystack?</h2>

<p>
    Haystack is in a late beta phase. We can't promise backward compatibility
    right now. That said, most of Haystack has been extremely stable since the
    end of February. I'd like to do a beta period with more people hammering on
    it and get some feedback. I also intend to further flesh out documentation
    and implement a Lucene backend before all the 1.0 features are complete.
    The Solr backend is very stable and suitable for medium-to-large
    deployments. The Whoosh backend is very promising (pure Python!) and
    suitable for small setups. As it matures, it will become even better.
</p>

<h2>Why Haystack?</h2>

<p>
    Perhaps you'd like to have a customized search that fits your users better
    than Google/Yahoo/MSN. Or you'd like to selectively enable searching on
    an aspect of your site. You might also want an advanced feature, like
    suggestions via "More Like This" or faceting.
</p>

<p>
    Further, it's true there is a myriad of options out there. This is one
    reason to use Haystack, as it is an attempt to unify many of these different
    options in a standard syntax.
</p>

<p>
    Haystack also plays nicely with third-party apps, so there's no need to
    fork someone else's app just to add search capabilities.
</p>

<h2>Where can I get Haystack?</h2>

<p>
    For now, Haystack is hosted on
    <a href="http://github.com/toastdriven/django-haystack">GitHub</a>, so you
    can either clone it or download a tarball. Setup is relatively simple and is
    detailed in the 
    <a href="http://haystacksearch.org/docs/tutorial.html">tutorial</a>.
</p>

<p>
    You'll probably want to start with the
    <a href="http://haystacksearch.org/docs/tutorial.html">Tutorial</a> then
    move on the the rest of the API documentation from there.
</p>

<p>
    Haystack is MIT licensed, so you may feel free to use it (or portions of
    it's code) in any project you need.
</p>

<h2>Getting Involved</h2>

<p>
    There's a <a href="http://groups.google.com/group/django-haystack/">mailing
    list</a> as well as an IRC channel (<code>#haystack</code> on
    <code>irc.freenode.net</code>). I'm still working on trying to find a
    bug/issue tracker.
</p>

<p>
    If you want to help out with development, please feel free to fork the
    project on GitHub or submit patches.
</p>