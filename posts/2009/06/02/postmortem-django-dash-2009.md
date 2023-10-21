---
title: 'Postmortem: Django Dash 2009'
date: '2009-06-02'
time: '01:29:02'
author: 'Daniel'
slug: 'postmortem-django-dash-2009'
---

<p>
    Now that the Dash is over, I wanted to write up a little postmortem with
    some thoughts about how things went. To understate things, this year's
    <a href="http://djangodash.com/">Django Dash</a> was amazing. In virtually
    every regard, the competition exceeded last year's contest. 
</p>

<h3>What Went Well</h3>

<p>
    First, a huge thanks to the
    <a href="http://djangodash.com/sponsors/">sponsors</a>. We went from 8 last
    year to 12 this year. Without them, there would be no prizes for the
    contest.
</p>

<p>
    We also doubled the number of teams that actively competed, which really
    impressed me. Many of the entries seem much more complete than last year as
    well.
</p>

<p>
    Using IRC &amp; <a href="http://twitter.com/djangodash">Twitter</a> were also big
    wins. The IRC channel (<code>#django-dash</code> on Freenode) was where the
    party was most of the weekend (thanks to
    <a href="http://ericholscher.com/">Eric</a> for setting it up and admin'ing
    it). And being able to more easily/effectively distribute information via
    Twitter was nice (less infrastructure/headaches for me). Plus it was fun
    watching the <code>#djangodash</code> fly by.
</p>

<p>
    More stats and sparklines improved the website itself. I used the
    <a href="http://www.omnipotent.net/jquery.sparkline/">jquery.sparkline</a>
    library and the new
    <a href="http://docs.djangoproject.com/en/dev/topics/db/aggregation/">Aggregation</a>
    support in Django trunk (soon 1.1), both of which proved easy to use and
    made it a little easier to spectate the contest.
</p>

<p>
    Bumping the team size from two last year to three yielded some bigger and
    more impressive projects. I don't think I'll bump it again next year (three
    seems to be a manageable size) but I'm glad that many of the teams
    benefitted from the extra member.
</p>

<p>
    Finally, I spent a lot of this year rewriting, refactoring and improving
    the codebase behind the site. A lot of the one-off code from last year
    went away and was replaced with better code with better tests. The site
    still doesn't run itself but lots more automation made things much better.
</p>

<h3>What Didn't Go As Well</h3>

<p>
    In a last minute panic on Friday, I had to switch the site to 
    <a href="http://mosso.com/">Mosso</a> for the weekend due
    to circumstances beyond my or
    <a href="http://webfaction.com/">WebFaction's</a> control. In a fine
    demonstration of Murphy's Law, after running perfectly fine for 363 days,
    the main server that hosts the Dash had hard drive issues. To Remi &amp;
    his crew's credit, they jumped on the problem and did their very best to
    get things back up and running. Unfortunately, due to the timing, there
    wasn't much choice for me. (That said, I recommend Mosso's service as it
    treated me very well for the weekend.)
</p>

<p>
    Also sad was the version control. Lots of people were less than pleased
    about having to use Subversion. I tried, in the week leading up to the
    competition, to support both <a href="http://git-scm.com/">Git</a> and
    <a href="http://www.selenic.com/mercurial/">Mercurial</a> in addition to
    Subversion but couldn't get all the details worked out in time. That's
    feature #1 on the list for next year's Dash.
</p>

<p>
    The site's design got completely recycled from last year because I ran out
    of time. It wasn't that great to begin with and having to stare at it a
    second year in a row is kinda depressing me.
</p>

<p>
    Finally, the rules are kinda getting me down. I thought that by keeping
    them simple (only 5 of them with short descriptions of each) that people
    would just <em>get</em> what I meant. But I long ago lost count of the
    number of questions surrounding them. There weren't as many people looking
    to bend the rules last year. Maybe I'm overreacting to it but I feel like
    I need to approach it differently next year.
</p>

<h3>What's Next?</h3>

<p>
    We've still got judging to go (something else to automate...) but between
    <a href="http://aprendia.com/">Ben</a>,
    <a href="http://www.b-list.org/">James</a> and
    <a href="http://seanbleier.com/">Sean</a>, I think it will go smoothly and
    well. Results will be announced roughly two weeks from now and the sponsors
    will award prizes at that time.
</p>

<h3>Stats About The Dash</h3>

<p>
    I collected some stats about how the competition went to give an idea of how
    things went. Next year, these bits will be baked into the site.
<p>

<h4>Top 10 Most Commits By Dashers:</h4>

<ol>
    <li>dusty has 225 commits.</li>
    <li>ericflo has 212 commits.</li>
    <li>brosner has 154 commits.</li>
    <li>defunkt has 135 commits.</li>
    <li>pnomolos has 134 commits.</li>
    <li>alex has 133 commits.</li>
    <li>xentac has 126 commits.</li>
    <li>jtauber has 116 commits.</li>
    <li>leah has 116 commits.</li>
    <li>liz has 107 commits.</li>
</ol>

<h4>Top 10 Most Commits By Teams:</h4>

<ol>
    <li>East meets West has 485 commits.</li>
    <li>Sword of Truth has 384 commits.</li>
    <li>Team 566 has 326 commits.</li>
    <li>Made with Lasers has 262 commits.</li>
    <li>Trousers has 207 commits.</li>
    <li>Pixels.fm has 161 commits.</li>
    <li>crunkd has 130 commits.</li>
    <li>The Epic has 129 commits.</li>
    <li>Code monkeys has 116 commits.</li>
    <li>Limbo has 116 commits.</li>
</ol>

<h4>Active Teams:</h4>
    
<p>
    Teams with >0 commits: 46<br>
    Teams with >10 commits: 34
</p>

<h4>Peak Commits:</h4>

<ol>
    <li>188 - 48th hour</li>
    <li>148 - 1st hour</li>
    <li>124 - 47th hour</li>
    <li>121 - 41st hour</li>
    <li>120 - 44th hour</li>
</ol>

<h4>Totals</h4>

<p>
    Total teams: 62<br>
    Total dashers: 139<br>
    Total commits: 3538
</p>

<h3>Fin?</h3>

<p>
    I've already begun planning for next year's Dash and, thanks to the
    infrastructure improvements this year, should be able to roll out a new
    design, some new features and a couple other bonuses for next year. High
    on that list is expanding version control to Subversion, Git &amp;
    Mercurial.
</p>

<p>
    Hopefully, everyone had fun and we'll see everyone back next year!
</p>