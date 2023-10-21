---
title: 'extends_default'
date: '2008-11-05'
time: '22:39:12'
author: 'Daniel'
slug: 'extendsdefault'
---

<p>Short and sweet tonight. Via problems like <a href="http://jeffcroft.com/blog/2008/aug/05/default-templates-django/">http://jeffcroft.com/blog/2008/aug/05/default-templates-django/</a> (that our in-house designers have also suffered from), I put together a template tag called "extends_default" a couple months back.</p>

<p>The basic premise is to allow a template to fall back on a similarly named "default" template that occurs later in the <code>TEMPLATE_DIRS</code>. Hence, you could have a generic "<code>blog/blog_detail.html</code>" that you use for all of your sites and, when launching a new blog, have a lightly customized version in a different template directory. That lightly customized version would use the <code>extends_default</code> tag instead of <code>extends</code> and refer to the same file name.</p>

<p>When rendered, it will create nodes for the lightly-customized version, then go back through the <code>TEMPLATE_DIRS</code> until it finds another file of the same name that is <em>NOT</em> using <code>extends_default</code>. It will then pull in those nodes and render as normal.</p>

<p>Unfortunately, due to the naive (and very quick) nature of Django's templating system, this is limited to only one level deep and, as such, does not simulate true inheritance. I looked into doing this but could not come up with a thread-safe way that did not involve hacking up Django's internals.</p>

<p>Rather than providing a repository on this, I've posted the snippet to <a href="http://www.b-list.org/">Mr. Bennett's</a> <a href="http://www.djangosnippets.org/">djangosnippets</a> site. You can find the source at <a href="http://www.djangosnippets.org/snippets/1167/">http://www.djangosnippets.org/snippets/1167/</a>. I'd welcome any feedback on it.</p>