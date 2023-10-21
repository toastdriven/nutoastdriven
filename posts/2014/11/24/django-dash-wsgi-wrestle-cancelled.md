---
title: 'Django Dash & WSGI Wrestle Cancelled'
date: '2014-11-24'
time: '19:06:36'
author: 'Daniel'
slug: 'django-dash-wsgi-wrestle-cancelled'
---

Unfortunately, I'm officially cancelling the [Django Dash](http://djangodash.com/) & [WSGI Wrestle](http://wsgiwrestle.com/) for 2014. It's been delayed numerous times & there frankly isn't enough time left in the year for them to happen. There are a handful of reasons why it can't happen anymore this year:

* Holidays

    Unfortunately, the end of the calendar year is chock full of holidays of all sorts. So trying to schedule a competition that not only I can commit to but also get a healthy number of participants is looking increasingly unlikely.

* Personal deadlines

    Not a lot to say here. I'm committed on work & personal projects that have left me short on free time.

* Site overhaul

    The Dash site has remained visually unchanged for several years. The sign-up flow (which has been improved several times over the last 9 years) is still janky & there's no way for teams to manage their own information.

    My goal is a visual refresh & adding a bunch of interface for teams to be able to better organize themselves & manage their details.

* Judging changes

    More on this in a bit.

Putting together a Dash/Wrestle takes approximately 30 hours of work before/during competition & another 40-50 hours post-competition, depending on the number of teams competing. I simply don't have that kind of spare time available before the end of the year.

In addition, targeting getting back on a during-the-summer schedule would have me doing two more competitions in less than 6 months, which is simply too short a timeframe.


Judging Changes
---------------

No punches pulled, judging is the **WORST** part of the competition. Were it not for judging, the competition could've happened at several points throughout the year.

Here's some math on why it's terrible:

* Let's say 75 teams sign up.
* Of those, typically 40-50 actually produce commits.
* The Dash/Wrestle rules judge both on:

    * Design
    * Innovation
    * Overall
    * (No longer) Code Quality

* Say we take 10 minutes to visually inspect the site & another 5 minutes to enter judgments

    50 teams x 15 minutes = 750 minutes
    750 minutes / 60 minutes per hour = 12.5 hours

That's right. At top speed, with no slowdowns or breaks, just for a cursory judgement of an entry, it takes **1.5 work days**. And that's **per judge**. None of those ideals happen in practice & it's a largely grueling/thankless task (other than the pizza & beer I've personally bought the judges in the past as thanks).

Add on trying to coordinate judging so everyone is evaluating on roughly the same criteria,which means judging at the same time & coordinating schedules, and you have some idea of the scope of the problem.

Running the Dash/Wrestle is **NOT** a technical problem, it's a (wo)manpower issue.

And for those who will say "get remote judges", I tried that during three separate years. Each year, I ended up doing a significant portion of the judging as different individuals weren't able to commit or grind through it. It's not so simply solved & I have yet to have it work out. So while appreciated, it doesn't work.


"Just Crowd-Source The Judging"
-------------------------------

Another popular "solution" is to say "Daniel, why don't you just *crowd-source* the judging? Y U NO WEB 2.0?". While I can appreciate this as a concept (in addition to the hours of my life I'd get back), this is not without its flaws:

* Establishing a common frame of reference for judging

    Even being judges working together in real life, it can take judging 10-12 teams to finally perfect this frame of reference, even if they've judged several years in a row. Trying to coordinate this out over hundreds of disparate & non-communicating judges is a problem I still need to solve.

* Getting adequate ratings across all teams

    Let's say you're a motivated judger. You might make it through a handful of teams, maybe your friend's team & a couple more that sound interesting. That's 4-5 teams, less than 10% of the competing teams. Add in that some of the coolest projects over the years have had unsexy/irrelevant names, and you're looking a seriously fragmented source of data.

* Preventing the ratings from being gamed

    This almost shouldn't need explaining, but with the top prizes typically being worth up to $1000 USD, the moment I give the public a rating form, someone will write a bot to flood it with positive reviews (or worse, poor reviews for everyone else).

    You can try giving people only a couple points (they'll just make smurf accounts), tracking IPs (LOL as if Tor & other options don't exist), using
    stats or ML to weed through (k-means doesn't help when the spammy results outweigh the other clusters). But this is basically intractable.


The Judging Solution
--------------------

However, judging does block the competition dates & I've burnt out several judges (despite the pizza & beer) in the process. After literal years of stewing on this, I believe I have a solution based on the concept of crowd-sourcing judging.

For next year's competition, a **requirement** of competing will being doing some limited judging of your peers. Teams with a significant number of **meaningful commits** will be granted a small number of votes to evaluate their peers with. Team members will have to **use up** their votes in order to qualify in the final judging.

The numbers here are ballparks, but upon competing in the Dash (& the Wrestle),
you'll receive 3 votes for specific other teams. These votes will be evenly distributed across all people in the contest, with enough overlap to ensure ample judging.

This solves:

* the manpower (limited time investment by everyone who wants to win), 
* getting an adequate number of votes for all teams (they're assigned over a statistically even distribution by people vested in the contest)
* & the gaming of results (there's a limited number of votes to be had). 

The only problems to be solved are ensuring a frame of reference & the UI/UX involved with presenting a system for doing the judging. I have thoughts in this regard, but again, time is needed to work these things out & flesh out the site.

I'm pretty well set on this idea, but would welcome some feedback on this before the competition next year. Overall, I think it'll improve the contest frequency/reliability.

In closing, I'm sorry to everyone who was looking forward to competing this year, but I'm hoping both competitions can come back stronger than ever next year.
