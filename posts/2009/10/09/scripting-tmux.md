---
title: 'Scripting tmux'
date: '2009-10-09'
time: '00:32:22'
author: 'Daniel'
slug: 'scripting-tmux'
---

<p>In my day-to-day work, I find myself needing full mini-environments for
several of the projects I work on. Frequently, I'll need to pop a handful of
terminals and start various daemons or do environment prep for working in them.
</p>

<p>In the past, after trying several things, I ended up using Applescript to
launch Terminal.app, pop tabs and load bits up. But I hated working with it,
it would frequently drop portions of the setup and was obviously
platform-specific. Since I had to setup a loaner laptop anyhow, it dawned on me
that I could use a terminal multiplexer instead. I had used
<code><a href="http://www.gnu.org/software/screen/">screen</a></code> in the
past for administration bits but never really enjoyed it.</p>

<p>However, <a href="http://8bitb.us">Alex</a> turned me onto
<code><a href="http://tmux.sourceforge.net/">tmux</a></code>, a modern
BSD-licensed multiplexer. After poking at it for about a half hour, I was able
to duplicate and improve on everything I had before. Without further ado:</p>

<p>My <code>.tmux.conf</code> file looks like:</p>

<script src="http://gist.github.com/205351.js"></script>

<p>Then I created shell scripts to build the environments for me. In this case,
to setup my <a href="http://haystacksearch.org/">Haystack</a> dev environment,
the script looks like:</p>

<script src="http://gist.github.com/205736.js"></script>

<p>I'm happy because it works beautifully, reads well and works under Mac OS X
and Linux. There might be better ways but this is mine and I like it.</p>