---
title: 'OSS: django-rsvp'
date: '2008-09-02'
time: '21:17:52'
author: 'Daniel'
slug: 'oss-django-rsvp'
---

<p>After what has obviously been quite the quiet spell, I've released a little more open-source to the world.  This time, it's in the form of a <a href="http://www.djangoproject.com/">Django</a> application called <a href="http://code.google.com/p/django-rsvp/">django-rsvp</a>.  It's a simple, reusable RSVP application in the style of Evite or Meetup.com.</p>

<p>It requires a pretty current version of Django (1.0-beta1 or better) and is the first really reusable app I've released.  Installing it is simple (grab the source from Google via the package or Subversion), put it/symlink it into your Django project/site, add "rsvp" to your INSTALLED_APPS, put a proper e-mail address into the "RSVP_FROM_EMAIL" setting, "syncdb" and add the included URLconf to your project/site's urls.  Full instructions are included, though there's not much more to it than that.</p>

<p>Like a good application, it has decent (and 100% passing) test coverage and the included templates are easily adapted/overridden by your templates.  I managed to crank it out over a pretty short amount of time so I'm pretty happy with how it turned out. Feedback is welcome, as always.</p>