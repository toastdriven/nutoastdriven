---
title: 'Haystack 1.2 Released'
date: '2011-05-04'
time: '20:28:17'
author: 'Daniel'
slug: 'haystack-12-released'
---

Haystack 1.2 was released yesterday ([PyPI](http://pypi.python.org/pypi/django-haystack/1.2.0)). It ships with n-gram (autocomplete) support for Solr & Whoosh, compatibility with Whoosh 1.8.X & a host of bugfixes. You can find more details on the [mailing list post](http://groups.google.com/group/django-haystack/browse_thread/thread/f98dc953fd440b28).

It's also notable because it will be of the Haystack 1.X series. Starting this week, I've been working on v2.0 of Haystack. I'm bumping the version for a couple reasons.

### Multi-index Support

The biggest notable feature will finally be the introduction of multiple index support (think multi-db). Haystack has long been able to index as many model types as you'd like, but doing things like master-slave setups or multiple language support have been difficult.

I was lucky enough to have been granted a contract to develop the feature, so I've been putting in full-time work on it this week & should have an experimental version available for testing before next week.

### API Cleanup

Like all software, Haystack has its share of warts & imperfections. Since I have the opportunity, I'm going back to correct some of the ones that bother me or have caused problems. This does mean backward-incompatibilities, hence the major revision bump.

Most of the integration code will look very similar, just refined slightly, so for better or worse the porting process should be straight-forward. And before the release, I'll be making migration documentation available so that it's at least relatively easy to port your code up to the new release.

### Timeframe

My OSS deadlines are always handwavy because real-life gets in the way more than I'd like. That said, I'm hoping that things will at least be close by the end of the month (May 2011). And as usual, after the initial back-incompat changes, I intend to keep the git master as stable as possible per the usual. I'd like to get some good real-world testing in before I unleash a proper release on the world.