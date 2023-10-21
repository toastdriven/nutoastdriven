---
title: 'Better Local Settings'
date: '2010-01-05'
time: '16:30:23'
author: 'Daniel'
slug: 'better-local-settings'
---

<p>A common convention I've seen in the Django community is to place code like the
following at the bottom of your settings file:</p>

<pre><code class="prettyprint">
# ``settings.py``
# Lots of typical settings here.
# ... then ...

try:
    from local_settings import *
except ImportError:
    pass
</code></pre>

<p>Then storing machine/user-specific settings within a <code>local_settings.py</code>> file.
This file is set to be ignored by version control.</p>

<p>I can't argue with needing overridden settings (do it all the time) but that
import is backward in my opinion. My preferred technique is to still use the
<code>settings.py</code> and <code>local_settings.py</code> but relocate the import. So
<code>local_settings.py</code> starts out with:</p>

<pre><code class="prettyprint">
# ``local_settings.py``
from settings import * # Properly namespaced as needed.

# Custom settings go here.
DATABASE_HOST = 'localhost'
</code></pre>

<p>The only other change is passing <code>--settings=local_settings</code> to any
<code>./manage.py</code> or <code>django-admin.py</code> calls.</p>

<p>Trivial implementation, you still only need to override what you need, no
changes needed to version control or development workflow. And since you've
already imported all of the base settings, you can reuse that information
to create new settings, like:</p>

<pre><code class="prettyprint">
# ``local_settings.py``
from settings import *

DATABASE_NAME = "%s_dev" % DATABASE_NAME
</code></pre>

<p>This is by no means a new technique, nor did I come up with it, but it's been
very useful to me and I have yet to encounter the drawbacks (other than
specifying the <code>--settings</code> flag, which also has an even easier fix via <code>DJANGO_SETTINGS_MODULE</code>) of this
approach.</p>

<p>Feedback, as always, is welcome.</p>