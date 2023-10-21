---
title: 'The State of Tastypie'
date: '2014-05-23'
time: '02:48:28'
author: 'Daniel'
slug: 'state-tastypie'
---

I received an email this past week from someone evaluating RESTful frameworks
for a near future project. Justifiably, they were concerned about whether
choosing Tastypie would be a liability or not for them. I sent a reply, but
wanted to turn this into a blog post so I could address a wider audience
(who probably have the same concern).

Most people's concerns center around a couple points, each of which I'd like to
address:

* Tastypie is still not 1.0+
* Competing RESTful frameworks becoming more popular
* The relative slow pace of development recently
* Travis CI hasn't been passing in months
* Incompatibility with what will soon be Django 1.7
* They've noted my work on [Restless](https://github.com/toastdriven/restless)


Tastypie Is Still Not 1.0+
--------------------------

Yes, it's true. The most recent release of Tastypie is still just
[v0.11.1](https://pypi.python.org/pypi/django-tastypie/0.11.1), which you
should upgrade to if you're using it.

This has nothing to do with the production-readiness of Tastypie. It's been
used on large-scale sites handling production loads for years. Git master is
**always** kept stable, passing all tests & ready for deployment. It's
[how we roll](http://django-tastypie.readthedocs.org/en/latest/#running-the-tests).

Tastypie hasn't gone 1.0 for a couple reasons:

1. No (good) solution for file uploads. There's a long-standing ticket on this
   & it's been on my radar from the very beginning. Unfortuantely, Tastypie
   deals with *serialized* bodies (instead of form-encoded data), so just using
   ``request.FILES`` isn't an option. There are some options here, but it means
   picking one, documenting it & identifying alternatives.
2. Performance. Tastypie is usually pretty good, but serializing lots of
   objects can be slow (URL resolution for HATEOAS support) & the fields (while
   nicely thread-safe) tend to err on the side of too much deep-copying. This
   comes down to having time to do some deep profiling of many different
   use cases & finding good solutions, plus producing more documentation.

Once those things are in-place, I'd be more than happy to slap a 1.0 on it. But
that has *nothing* to do with production-readiness.


Competing RESTful frameworks becoming more popular
--------------------------------------------------

When I created Tastypie several years ago, there were only 1-2 other popular
API frameworks for Django. Most prominently, I wanted something more flexible
& with better test coverage, and the rest is history.

Today's 2014 landscape is much different. There are many, many more competing
apps, each with their own pros/cons. Most popular is Django REST Framework, made
by the excellent Tom Christie.

Here's the thing: **You should evaluate your options & pick what works for you**.
I'm not directly making money off Tastypie (and Toast Driven barely did when it
was an active company). It's not some Internet popularity contest, at least as
far as I'm concerned. And different strokes for different folks is pretty
central concept here.

If DRF or Conduit or Restless or whatever works better for you or fits your
head, great! Thanks for at least giving Tastypie a look & I hope you have great
success! You're not hurting my feelings or a bad person or whatever, you're
just using what works for you. And that's a Good Thing™.


The relative slow pace of development recently
----------------------------------------------

It's true, Tastypie's development has languished a bit. I don't have a great
answer here. For me, Tastypie has almost always been a maintanence burden that
I develop in isolation. I've spent perhaps 1-1.5 months over the years using
it in a professional setting where I was being paid, and then it was typically
integrations or Hard Things. There's no company supporting full-time development
or anything. I also was under OSS restrictions for awhile (which is no longer
the case), which affected my involvement with Tastypie & beyond.

I try to answer issues & PRs as I can, but there's more than I could handle,
even if it were my only side project (which it's most assuredly not).

Beyond me, we're up to 14 people with a commit bit, but it's *open-source*.
I can't speak for anyone else's time, I can't make them do anything, I don't
have managerial/business edict. The best I can do is be appreciative of all the
great help I've gotten.

I hope to improve this some in the near future (I'm still one of the most active
committers), but it's a work-in-progress.


Travis CI hasn't been passing in months
---------------------------------------

I honestly don't know what to say about [Travis CI](https://travis-ci.org/toastdriven/django-tastypie).
It's not that I don't care, but we had years of passing tests, then one day
the harness [stopped working](https://travis-ci.org/toastdriven/django-tastypie/jobs/15361074).

I've spent/lost 3-4 nights at this point trying to find a work-around. I've been
in touch with the Travis CI support (who were very kind & tried to be helpful).
No changes were made to our testing setup at the time builds started failing.

I can assure you that tests are still passing on multiple core developer
machines (with different OS/Python variants), but I don't have an answer on
Travis yet. It is not because our tests don't work but something is wrong with
the way we run on Travis.


Incompatibility with what will soon be Django 1.7
-------------------------------------------------

Unfortunately, this is a known issue & on my short-term hit list for Tastypie.
The mechanics of how we were importing ``User`` models no longer work in the
wake of Aymeric's wonderful app-loading work on Django.

I suspect the answer will be simple (lazily import the models), but doing so
in a backward-compatible manner for a wide variety of setups is a trickier task.
There's an open issue (actually several) on this, I simply need time to dive in.
Rest assured this will be dealt with in the near future.


They've noted my work on Restless
---------------------------------

This is the hard part of the post. [Restless](https://github.com/toastdriven/restless)
is my new RESTful framework.

The [Philosophy](http://restless.readthedocs.org/en/latest/philosophy.html)
section explains most of my reasons. Long ago, I actually tried extracting the
core of Tastypie for use elsewhere (as Piecrust). This failed dismally.

But in Restless, I've succeeded in that task. I have code I can write in Flask,
then move to Django as a site grows, by simply changing the inheritence. Those
resources could be open-sourced, then used on Pyramid by someone else with a
minor change. This feels really powerful to me.

It's not that I still don't love Tastypie. I won't stop supporting Tastypie
as a result (though that'd make my life oodles better). It's simply a shift
in what I find important or relevant **in the APIs I create**.

However, the time I've spent on Django Dash/Haystack/Boto/WSGI Wrestle/itty/Django/etc.
far outweighs the impact Restless has had on my time for Tastypie. The real
danger is that I'm simply spread much too thin, not that my tiny library is
going to replace my bigger library.


Conclusion
----------

In short, I still feel like Tastypie's future is bright & I'm still going to
continue working on it. I'm still deeply pleased with it & the success it's had.
I will understand if others move on (that's the nature of software, especially
when it's OSS), but I hope I can ease others' minds about the state of Tastypie.
