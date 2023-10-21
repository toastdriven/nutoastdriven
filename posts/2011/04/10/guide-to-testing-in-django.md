---
title: 'A Guide to Testing in Django'
date: '2011-04-10'
time: '00:25:53'
author: 'Daniel'
slug: 'guide-to-testing-in-django'
---

For many people, testing their Django applications is a mystery. They hear that
they should be testing their code but often have no clue how to get started.
And when they hit the [testing docs](http://docs.djangoproject.com/en/1.3/topics/testing/),
they find a deep dive on what functionality is available, but no guidance on
how to implement.

This is the first in a series of blog posts to try to help alleviate this &
get everyone on the testing bandwagon. I'll assume you've never done any
testing before but that you're comfortable with Python & Django.

We'll be walking through adding tests to the perennial
[tutorial](http://docs.djangoproject.com/en/1.3/intro/tutorial01/) Django app.
To make it easier to follow along, I've uploaded the code to
[Github](https://github.com/toastdriven/guide-to-testing-in-django) with tags for the
major steps & to show how the code changes over time.

Before we dive into code, let's introduce some basic concepts & talk about how
to think/go about testing.


Why Should You Test Your Code?
------------------------------

*"Code without tests is broken by design."* - [Jacob](http://jacobian.org/)

Providing automated tests for your code is a way to repeatedly ensure, with
minimal developer effort, that the code you wrote to handle a task works as
advertised. I like to think of tests as my insurance policy. They generally
keep me from breaking existing code & looking foolish to other people. They're
also concrete proof that the code works correctly. Without that proof, what you
have is a pile of code that worked right once on your machine & that you'll
either have to hand-test again & again in the future or will break without
you knowing any wiser.

When you first get started, writing tests is a scary task that sounds like
extra work. But simple tests are easy to write and having some tests is better
than no tests at all. And as you add new tests, your suite (and your
confidence) grows with it.

This is not to say that tests solve everything. There will always be bugs in
software. Maybe the tests miss a codepath or a user will use something in
an unexpected way. But tests give you better confidence & a safety net.


Types Of Testing
----------------

There are many different types of testing. The prominent ones this series will
cover are **unit tests** and **integration tests**.

**Unit tests** cover very small, highly-specific areas of code. There's usually
relatively few interactions with other areas of the software. This style of
testing is very useful on critical, complicated components, such as validation,
importing or methods with complex business logic.

**Integration tests** are at the opposite end of the spectrum. These tests
usually cover multiple different facets of the application working together
to produce a result. They ensure that data flow is right & often handle
multiple user interactions.

The main difference between these two types is not the tooling but the approach
and what you choose to test. It's also a very common thing to mix & match these
two types throughout your test suite as it is appropriate.


Tooling
-------

Within the Python world, there are a wide variety of tools to test your code.
Some popular options include:

* ``unittest`` / ``unittest2``
* ``doctest``
* ``nose``

This guide won't dive into ``doctests`` or ``nose`` tests, sticking to
``unittest``. This is because tests written in ``unittest`` run the fastest
when testing Django apps (thanks to some fun transactional bits). I'd encourage
you to go investigate the other options, if only to expand your knowledge of
what's available.

You should not confuse ``unittest`` (the library) with **unit testing** (the
approach of testing small chunks of contiguous code). You'll often use the
``unittest`` library for both **unit** & **integration`` tests.


What To Test?
-------------

Another common setback for developers/designers new to testing is the
question of "what should (or shouldn't) I test?" While there are no hard & fast
rules here that neatly apply everywhere, there are some general guidelines
I can offer on making the decision:

* If the code in question is a built-in Python function/library, don't test it.
  Examples like the ``datetime`` library.
* If the code in question is built into Django, don't test it. Examples like
  the fields on a ``Model`` or testing how the built-in ``template.Node``
  renders included tags.
* If your model has custom methods, you *should* test that, usually with
  unit tests.
* Same goes for custom views, forms, template tags, context processors,
  middleware, management commands, etc. If you implemented the business logic,
  you should test your aspects of the code.

Another upfront question is "how far down do you go?" Again, there's no right
answer here, save for "where am I comfortable?" If you start mumbling "yo
dawg..." under your breath or humming the tune of the INCEPTION theme, you
know you've probably gone too far. :D


When Should You Test?
---------------------

Another point of decision is deciding whether to do **test-first** (a.k.a. Test
Driven Development) or **test-after**. **Test-first** is where you write the
necessary tests to demonstrate proper behavior of the code **BEFORE** you
write the code to solve the problem at hand. **Test-after** is when you've
already written the code to solve the problem, then you go back & create
tests to make sure the behavior of the code you wrote is correct.

This choice comes down to personal preference. An advantage of test-driven
development is that it forces you to not skimp on the tests & think about the
API up front. However, it feels very unnatural at first & if you have no
experience writing tests, you may be at a loss as to what to do. Test-after
feels more natural but can lead to weak tests if they're hurried & not given
the proper time/effort.

Something that is always appropriate, regardless of general style, is when you
get a bug report. **ALWAYS** create a test case first & run your tests. Make sure
it demonstrates the failure, **THEN** go fix the bug. If your fix is correct,
that new test should pass! It's an excellent way to sanity check yourself & is
a great way to get started with testing to boot.


Let's Get To It!
----------------

Now that we've got a solid foundation on the why, what & when of testing, we're going
to start diving into code. Most people's first experiences with Django involve
the classic "polls" app (introduced in Django's tutorial docs). Since the
tutorial never adds or mentions tests for that application, we'll use it as
a starting point.

You should clone the repository (``git clone https://github.com/toastdriven/guide-to-testing-in-django.git``)
to follow along. Whenever a decent chunk of code or new concept is introduced,
I will mention the tag you should check out (``git co <tagname>``).

**Tag:** 01-initial  
Our starting point is the completed "polls" app (with a few bugs intentionally
added for demonstration). The first thing we'll do is run the test suite, even
though we haven't added any tests yet.

Run the following command:

    python manage.py test

You'll get a large number of ``.``s then the following output:

    ----------------------------------------------------------------------
    Ran 307 tests in 5.763s
    
    OK

What? How are there so many tests and all of them already passing? The answer
is that the various Django ``contrib`` apps that are included in the
``INSTALLED_APPS`` all have tests that run as part of the suite.

Since we trust that Django is working right, we'll run tests only for our
application (``polls``). Run the following command:

    python manage.py test polls

This limits the tests run only to those within the ``polls`` app. You should
get something more reasonable, like:

    .
    ----------------------------------------------------------------------
    Ran 1 test in 0.000s
    
    OK

That's better, though we still have two unaccounted-for tests. When you run
``python manage.py startapp <appname>``, this automatically creates a
``tests.py`` file within your app. This file has two basic, kinda-useless tests
included. Something like:

    """
    This file demonstrates writing tests using the unittest module. These will pass
    when you run "manage.py test".
    
    Replace this with more appropriate tests for your application.
    """
    
    from django.test import TestCase
    
    
    class SimpleTest(TestCase):
        def test_basic_addition(self):
            """
            Tests that 1 + 1 always equals 2.
            """
            self.assertEqual(1 + 1, 2)

Since ``1 + 1 = 2`` doesn't really test anything meaningful, we're going to
get rid of these & replace them with something more useful. We'll start with
the easiest area of Django to add new tests: views.


Adding Tests To Views
---------------------

Step one is to nuke the existing tests. Select everything in ``tests.py`` &
delete it all. Much better.

**Tag:** 02-first-test  
Let's replace it with the simplest meaningful test we can do:

    from django.test import TestCase
    
    
    class PollsViewsTestCase(TestCase):
        def test_index(self):
            resp = self.client.get('/polls/')
            self.assertEqual(resp.status_code, 200)

This code sets up a new test case (``PollsViewsTestCase``), which you can think
of as a collection of related tests. Any method name starting with ``test``
will be run automatically & its output will be included in the testing output
when we run the command.

The test itself is simple. We ask the [``Client``](http://docs.djangoproject.com/en/1.3/topics/testing/#module-django.test.client)
(``self.client``) built-in to Django's [``TestCase``](http://docs.djangoproject.com/en/1.3/topics/testing/#writing-unit-tests)
to fetch the URL ``/polls/`` using ``GET``. We store that response (an
[``HttpResponse``](http://docs.djangoproject.com/en/1.3/ref/request-response/#httpresponse-objects)
in ``resp``, then perform tests on it.

In this case, we do a simple check on what status code did we get back. Since
successful HTTP GET requests result in a ``200``, we do an ``assertEqual`` to
make sure ``resp.status_code = 200``. When we run our tests, we get:

    .
    ----------------------------------------------------------------------
    Ran 1 test in 0.114s
    
    OK

Much better. And cheers, because we know that our index view works! Or does it?
We know that the user will get a successful response, but we don't know what
content the user will get.

Fortunately, we got back that ``HttpResponse`` we stashed in ``resp``. As you
(hopefully) know, ``HttpResponse`` objects include the content the user should
get back. We could test that content against a known string. However, that'd be
comparing the full rendered content of the page, which could have other
elements involved (template tags, design changes, etc.) that could make our
tests fail when there's nothing wrong.

Fortunately, there's a better way. The ``HttpResponse`` you get back has a
number of additional properties on it that will make it easier for us to test.
In particular, the useful ones are:

* ``resp.status_code``
* ``resp.context``
* ``resp.templates``
* ``resp[<header name>]``

Since the context should be very consistent between runs, let's use it to make
sure things are on the up & up:

    from django.test import TestCase
    
    
    class PollsViewsTestCase(TestCase):
        def test_index(self):
            resp = self.client.get('/polls/')
            self.assertEqual(resp.status_code, 200)
            self.assertTrue('latest_poll_list' in resp.context)
            self.assertEqual([poll.pk for poll in resp.context['latest_poll_list']], [1])

We add a check to make sure the ``latest_poll_list`` key is seen in the
``context``. Then we make sure that the only ``Poll`` we have in our database
is in that list of latest polls.

You might be asking "why use a list comprehension"? The answer is that, without
using a list comprehension, what you'll actually get back out of the context
is that list of the most recent five ``Polls``. Since you're evaluating the 
list when you run ``assertEqual``, the ``Poll`` objects will each return their
``__unicode__`` method, which could change over time. By checking the ``pk``,
we make sure that out tests don't randomly fail in the future.

Let's run our tests:

    python manage.py test polls

Uh-oh. This doesn't look good:

    F
    ======================================================================
    FAIL: test_index (polls.tests.PollsViewsTestCase)
    ----------------------------------------------------------------------
    Traceback (most recent call last):
      File "/Users/daniel/Desktop/guide_to_testing/polls/tests.py", line 9, in test_index
        self.assertEqual([poll.pk for poll in resp.context['latest_poll_list']], [1])
    AssertionError: Lists differ: [] != [1]
    
    Second list contains 1 additional elements.
    First extra element 0:
    1
    
    - []
    + [1]
    ?  +
    
    
    ----------------------------------------------------------------------
    Ran 1 test in 0.100s
    
    FAILED (failures=1)

What happened? Our ``.`` was replaced with an ``F`` & we got a traceback saying
``AssertionError: Lists differ: [] != [1]``. For some reason, the list of
primary keys we were expecting wasn't there!

The reason is that tests don't run against the database you have in your
``settings.py``. This could lead to destroying real data. Instead, Django runs
your tests against a test-only database. When Django creates that database,
it's completely empty, hence, the ``Poll`` that's present in our "live"
database isn't there.

To fix this, we can manually recreate the data as part of the test.

    import datetime
    from django.test import TestCase
    from polls.models import Poll, Choice
    
    
    class PollsViewsTestCase(TestCase):
        def test_index(self):
            poll_1 = Poll.objects.create(
                question='Are you learning about testing in Django?',
                pub_date=datetime.datetime(2011, 04, 10, 0, 37)
            )
            choice_1 = Choice.objects.create(
                poll=poll_1,
                choice='Yes',
                votes=0
            )
            choice_2 = Choice.objects.create(
                poll=poll_1,
                choice='No',
                votes=0
            )
            
            resp = self.client.get('/polls/')
            self.assertEqual(resp.status_code, 200)
            self.assertTrue('latest_poll_list' in resp.context)
            self.assertEqual([poll.pk for poll in resp.context['latest_poll_list']], [1])

Now, if we run our tests, we get:

    ----------------------------------------------------------------------
    Ran 1 test in 0.020s
    
    OK

Much better. However, that was a lot of work to create that data & having to
do that a lot could get verbose, when what you want is for a test to be a
concise as possible. There's a general solution to this problem, in the form
of fixtures.


Adding fixtures
---------------

Fixtures are serialized data that are easy to load. And one of the best uses
if for test data within test cases. There are several options for creating
them:

* ``python manage.py dumpdata``
* By hand
* Applications like ``testmaker``

For now, because we're lazy & want to use what's included with Django, we'll
take our "live" database & dump that data. Run the following command:

    mkdir polls/fixtures
    python manage.py dumpdata polls --indent=4 > polls/fixtures/polls_views_testdata.json

This gives us a new directory (``fixtures``) & drops some nicely formatted JSON
data in ``polls_views_testdata.json``. Let's use this new fixture to run our
tests.

**Warning** - Fixture names are "project-wide", so make sure your fixtures have
a unique name, otherwise you may get unexpected data.

**Tag:** 03-better-index  
First, we need to modify our code to use this new fixture. We'll remove the
model creation bits we added & use the ``TestCase.fixtures`` attribute to tell
Django's testing facilities what data we want to use when running the tests.

    import datetime
    from django.test import TestCase
    from polls.models import Poll, Choice
    
    
    class PollsViewsTestCase(TestCase):
        fixtures = ['polls_views_testdata.json']
        
        def test_index(self):
            resp = self.client.get('/polls/')
            self.assertEqual(resp.status_code, 200)
            self.assertTrue('latest_poll_list' in resp.context)
            self.assertEqual([poll.pk for poll in resp.context['latest_poll_list']], [1])

When we run our tests, we see that they still pass correctly:

    .
    ----------------------------------------------------------------------
    Ran 1 test in 0.115s
    
    OK

This is great! Let's add a few more tests to make sure the question & choices
are right as well.

    import datetime
    from django.test import TestCase
    from polls.models import Poll, Choice
    
    
    class PollsViewsTestCase(TestCase):
        fixtures = ['polls_views_testdata.json']
        
        def test_index(self):
            resp = self.client.get('/polls/')
            self.assertEqual(resp.status_code, 200)
            self.assertTrue('latest_poll_list' in resp.context)
            self.assertEqual([poll.pk for poll in resp.context['latest_poll_list']], [1])
            poll_1 = resp.context['latest_poll_list'][0]
            self.assertEqual(poll_1.question, 'Are you learning about testing in Django?')
            self.assertEqual(poll_1.choice_set.count(), 2)
            choices = poll_1.choice_set.all()
            self.assertEqual(choices[0].choice, 'Yes')
            self.assertEqual(choices[0].votes, 1)
            self.assertEqual(choices[1].choice, 'No')
            self.assertEqual(choices[1].votes, 0)

We do some tests to make sure all the data we're expecting is there. Again, run
the tests & receive an all-clear:

    .
    ----------------------------------------------------------------------
    Ran 1 test in 0.065s
    
    OK

Another point of note is that the individual ``test`` methods are what
count toward the overall test results, not each assertion. So while we've
fleshed out our ``test_index`` method, it's still only counted as one test.

**Tag:** 04-second-test  
To introduce, more coverage, let's test the ``detail`` view. Add the following
method to ``PollsViewsTestCase``:

    def test_detail(self):
          resp = self.client.get('/polls/1/')
          self.assertEqual(resp.status_code, 200)
          self.assertEqual(resp.context['poll'].pk, 1)
          self.assertEqual(resp.context['poll'].question, 'Are you learning about testing in Django?')
          
          # Ensure that non-existent polls throw a 404.
          resp = self.client.get('/polls/2/')
          self.assertEqual(resp.status_code, 404)

It uses all the same things we've already introduced, which is a very common
pattern for views that simply display data. As a new twist, we're also checking
to make sure that if a non-existent ``Poll`` primary key is requested, that
we're correctly serving an ``Http404``.

Running the tests gives us:

    E.
    ======================================================================
    ERROR: test_detail (polls.tests.PollsViewsTestCase)
    ----------------------------------------------------------------------
    Traceback (most recent call last):
    # ... lots here...
    TemplateDoesNotExist: 404.html
    
    ----------------------------------------------------------------------
    Ran 2 tests in 0.418s

    FAILED (errors=1)

Oops! We made the common mistake of forgetting to add the ``404.html`` and
``500.html`` templates (since the test suite usually runs with
``settings.DEBUG = False``). We'll create those files (empty is fine for now) &
we're back to passing tests:

    ..
    ----------------------------------------------------------------------
    Ran 2 tests in 0.097s
    
    OK

Since the ``results`` view is largely the same (at least right now), tests
for that a largely a duplicate of the ``test_detail`` ones:

    def test_results(self):
          resp = self.client.get('/polls/1/results/')
          self.assertEqual(resp.status_code, 200)
          self.assertEqual(resp.context['poll'].pk, 1)
          self.assertEqual(resp.context['poll'].question, 'Are you learning about testing in Django?')
          
          # Ensure that non-existent polls throw a 404.
          resp = self.client.get('/polls/2/results/')
          self.assertEqual(resp.status_code, 404)

Running the tests gives us:

    ...
    ----------------------------------------------------------------------
    Ran 3 tests in 0.079s
    
    OK

This is actually very important, even though those tests are trivial, because
those views could change in the future & having test coverage helps ensure that
things aren't broken. As we refactor parts of the app in the next installment,
you'll see how this can be important.


What's Next?
------------

We've covered getting up & started with testing, going from no tests to
ensuring that the display aspects of our application work properly. Things
we'll cover next time:

* Testing POST requests
* Testing forms
* Testing models


### Updates

* Fixed Github link - Thanks <a href="http://twitter.com/prometheus">@prometheus</a>.
* Removed doctests from the autogenerated test code, as that's no longer there
  in Django 1.3. Thanks <a href="http://twitter.com/alex_gaynor">@alex_gaynor</a>.
* Fixed references from ``test_`` to just ``test``. Thanks
  <a href="http://twitter.com/notanumber">@notanumber</a>.
* Fixed broken URLs in the final tests. Thanks to Laura Creighton.