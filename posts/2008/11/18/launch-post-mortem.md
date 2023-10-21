---
title: 'Launch Post-Mortem'
date: '2008-11-18'
time: '22:17:35'
author: 'Daniel'
slug: 'launch-post-mortem'
---

<p>Since my brain has turned pretty soft and mushy post-launch, I thought I'd cover a couple "lessons learned" from the experience of relaunching the flagship World Company properties. My biggest responsibility during the launch was migrating the database (from pre-magic-removal to Django 1.0) so I'll blather mostly about that.</p>

<h3>1. Always UTF-8 Where Possible</h3>

<p>ASCII is never the right answer. We live in a time where the restrictions that once made ASCII palatable no longer exist. And as the Internet brings everyone closer, you will appreciate being able to go multi-lingual with ease, rather than pain. We went through a fair amount of pain converting SQL ASCII to UTF-8 but the result is something much better.</p>

<h3>2. Good Hardware Makes A Difference</h3>

<p>For our initial/beta launch about a month ago, I did the DB conversion on my laptop, which wasn't much of an issue as the DB size was relatively small. But this time, the DB was almost 4 Gb in size. Transforming the DB on my laptop would take upwards of 8 hours to complete. But by leveraging the eventual production DB server that <a href="http://8bitb.us/">Alex</a> provided, we were able to trim that down to only 2 hours. Plus we were immediately ready to use the new DB (no dump/transfer/restore process).</p>

<h3>3. Good People And Good Tests Go A Long Way</h3>

<p>Given how dramatically some portions of Ellington changed, I would attribute much of the success of the launch to the way we've improved our test coverage and the good people we've got. We found a lot of the porting bugs we introduced through the tests and it's great to know that you've got a benchmark for most of the code when you go to make future changes.</p>

<h3>4. The Current State Of Data Migration Hurts</h3>

<p>&gt;95% of our migration process had to be done by raw SQL queries. We had a useful tool that converted many of the pre-magic-removal tables to current schemas, but managing all of them, plus applications that had been renamed as well as consolidated features and small pony requests was not fun (as well as introducing a fun 1 bus scenario). I wish I had ideas about how to make things like this better.</p>

<p>Overall, we had a pretty good launch, with most things being very solid and only typical bugfixes (mostly non-urgent) post-launch. A major internal goal is going to be to continue to track current Django releases (as opposed to backporting features) as well as more investigation of schema migration tools. Now if you'll excuse me, the bed is calling...</p>