---
title: 'Haystack & Tastypie Orgs'
date: '2015-02-02'
time: '20:41:08'
author: 'Daniel'
slug: 'haystack-tastypie-orgs'
---

As of today, I pulled the trigger on something I should've done long ago.
Both [Tastypie](https://github.com/django-tastypie) &
[Haystack](https://github.com/django-haystack) now have full GitHub
organizations.

Contributors on both sides have been doing a great job maintaining them but
haven't had enough control over the repositories, due to the way GitHub's
collaboration feature works on an individual repo. This should grant them more
control.

## Migrating

As an end-user, you don't have to do much. GitHub will handle redirects, so
trying to view https://github.com/toastdriven/django-haystack will redirect
to https://github.com/django-haystack/django-haystack.

Similarly, cloning from https://github.com/toastdriven/django-haystack.git
will point to https://github.com/django-haystack/django-haystack.git.

**However**, if you want to be awesome, correcting your `requirements.txt` files
to clone from the new URL (https://github.com/django-haystack/django-haystack.git)
and updating your cloned repos
(`git remote set-url origin https://github.com/django-haystack/django-haystack.git` & 
`git remote set-url origin https://github.com/django-haystack/django-tastypie.git`)
will save work & make the fetches faster. And who doesn't like faster installs?

## Why?

It's no surprise I've been absent lately. My burnout is the subject of a
different post for a different time. This should put more power in the hands of
the people who are maintaining the code. I'm also working to give them more
permissions in other places, like [Read the Docs](https://readthedocs.org/)
and [Travis](https://travis-ci.org/).

Thanks to everyone for their patience & hopefully this is a smooth
(much-overdue) transition.
