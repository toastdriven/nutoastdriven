---
title: "What's Wrong With Django (Slight Return)"
date: '2008-11-13'
time: '22:41:32'
author: 'Daniel'
slug: 'whats-wrong-django-slight-return'
---

<p>Having been a professional Django developer for <a href="http://www.mediaphormedia.com/">Mediaphormedia/The World Company</a> the last 5 months has been a happy experience. The vast majority of my experience, especially the changes leading up to 1.0, has been very good. Most aspects of the framework are well thought out and flexible. And my experience with the code quality is that it is well written and (relatively speaking) fairly bug free.</p>

<p>However, because I spend more time with it than I did as a hobbyist before, I've started to notice things I wish were better or would like to improve. So  since I'm in a crappy mood, I'm going to (as politely as I can) rant a little about things that haven't been as pleasant. I intend to do something about many of these things as more time permits toward the end of the year. Onward to the list.</p>

<ol>
    <li>Doctesting Is A Little Painful</li>
    <li>Fixture Hell</li>
    <li>Testing Suite Speed</li>
    <li>Generic Views &amp; Pagination</li>
    <li>SQL Aggregation</li>
    <li>Documentation</li>
</ol>

<h3>1. Doctesting Is A Little Painful</h3>

<p>First off, I think doctesting can be pretty great. It's easy to write and easy to hand test. There's very little overhead in producing them. But there are pain points too.</p>

<p>The worst is the line numbers for failures. I have never seen them point to the correct line in the file where the error occurred, so you have hunt down where the failure occurred before you can debug it.</p>

<p>Additionally, loading fixtures in doctests sucks. The "official" way (stated via a ticket) is as follows:</p>

<pre><code class="prettyprint">"""
>>> from django.core.management import call_command
>>> call_command('loaddata', 'my_fixture_here.json') #doctest: +ELLIPSIS
Installing yaml fixture 'my_fixture_here' ...
Installed 4 object(s) from 1 fixture(s)
"""
</code></pre>

<p>Ouch, ouch, ouch. Nevermind the fact that we're essentially simulating manually running the <code>./manage.py loaddata my_fixture_here</code>, this command dumps output to the screen. And if your fixtures change (add/remove objects), you either use the <code>doctest: ELLIPSIS</code> comment or gain a fresh test failure because it loaded all the data you asked it to load (different fixture count).</p>

<h3>2. Fixture Hell</h3>

<p>Fixtures make me mad in other ways. For instance, let's say you write two applications, and like a good developer, include tests with fixtures in both. If both apps create a similar model that their data depends on (such as a <code>User</code> object) with the same primary key, when run together, one primary key will overwrite the data and potentially cause a test fail that doesn't occur when the app's tests are run on their own.</p>

<p>Additionally, you better hope you aren't using a <code>GenericForeignKey</code> or relying on a <code>ForeignKey</code> to a <code>ContentType</code> because at run-time, there's no guarantee that apps/models will be installed in the same order as your instance. In fact, this is frequently not the case, especially between different developers or different instances. The only solution to this I have come up with is to, as part of your tests (either in <code>setUp</code> or the top of your doctest), manually load up both the desired <code>ContentType</code> and your fixture objects that depend on them, reset their <code>content_type</code> to the correct id, then run the tests.</p>

<p>Finally, having to specify <code>ForeignKey</code>s by id (rather than by name like Rails<sup><a href="#footnote_1">1</a></sup>) just kinda smells. I understand that it makes for an easier implementation but breaks unnecessarily in real life.</p>

<h3>3. Testing Suite Speed</h3>

<p>Here's a dirty little secret of testing Django apps. Doctests run <em>way</em> faster than <code>django.test.TestCase</code> (unittest) tests. The reason is that the <code>TestCase</code>-style tests truncate and reload all the fixtures in your database <em>on every test method</em>. So if you have a lot of fixtures and a lot of test methods, go brew some coffee/tea and sit for a spell.</p>

<h3>4. Generic Views &amp; Pagination</h3>

<p>At the very least, date-based generic views seem to lack pagination. This is a borderline atrocity and leads to constantly wrapping these types of generic views. It's not hard but it's more work than it should be, especially if the list-detail generic views support it.</p>

<h3>5. SQL Aggregation</h3>

<p>This is more of a <a href="http://djangopony.com/">pony</a> request than anything else, but I really can not wait for some sort of aggregation support to land in Django trunk. I know you can write manual queries (believe me, had to do a bunch of this already) and there are <a href="http://www.eflorenzano.com/blog/post/secrets-django-orm/">ways to do it now</a>, but I'm waiting for an official API with some backward compatibility. I need GROUP BY and MAX/MIN/SUM/AVG in the worst way.</p>

<h3>6. Documentation</h3>

<p>Finally, I have a love/hate relationship with the new documentation. I love that there's search and deep links and, to an extent, that the pages are smaller. But finding what you want, especially if you're new to Django or even experienced with it, is ridiculously hard. It takes 4 clicks (minimum) to find the <code>QuerySet</code> reference, something that many of us use day in and day out. Additionally, using the search frequently sends you to the page you want with an "OLD DOCS OH NOES!" warning when it's actually the new documentation. Frustrating and probably kinda scary to a newbie.</p>

<h3>The Bitter End</h3>

<p>The best part about all of this, to me, is that everything on this list can be fixed/improved (and I intend to submit patches where I can). Also awesome is that these are my complaints, instead of lower-level details or more common cases. To me, Django is doing much better than other frameworks if this is the best I could come up with for a rant.</p>

<hr>

<p><small><a name="footnote_1">1</a> - HA! Snuck in the obligatory Rails reference!</small></p>