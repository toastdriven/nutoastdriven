---
title: 'Tea Timer'
date: '2008-11-14'
time: '23:00:40'
author: 'Daniel'
slug: 'tea-timer'
---

<p>Since I'm pressed for time tonight, this will be quick. While coding at home, I like to enjoy a good cup of tea. However, nearly without fail, I leave the tea bag in too long and get a cup that's brewed too strong. I'm sure there are other solutions out there, but the fact of the matter is that I could code up a tea timer faster than a Google search and testing various apps would take. Plus, it's <a href="http://codekata.pragprog.com/">good exercise</a> and the kind of code snippet I would've liked to have seen when I was learning Python.</p>

<pre><code class="prettyprint">#!/usr/bin/env python
import time


def tea_timer(minutes):
    time.sleep(minutes * 60)
    return "Tea's done!"


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) != 2:
        print "Usage: %s <time in minutes>" % (__file__)
        sys.exit()
    
    minutes = float(sys.argv[1])
    print tea_timer(minutes)
    
</code></pre>

<p>The code itself is straightforward but what's interesting are the modules used and the way the code is written. We're only using <code>time</code> module (which is very useful for things beyond <code>sleep</code>) and the <code>sys</code> module for checking command line arguments and exiting.</p>

<p>The Python bits are shebang (portable to other computers which may store their Python in a different spot), the <code>__name__</code> check (see if the script is being imported or run from the command line) and the <code>__file__</code> variable, which provides the filename of the current file (no hardcoding the script name).</p>

<p>In addition to being a standalone script, it's built so it could be integrated into anything (a small Tk application, a Django view) via an import. The code within the <code>__name__</code> check is simply ignored and the <code>tea_timer</code> function (simple as it is) can be called.</p>

<p>There will be a better post tomorrow, after I've recharged a bit. I've got a couple big posts in the works that should be a touch juicier.</p>