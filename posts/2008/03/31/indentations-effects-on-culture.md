---
title: "Indentation's Effects On Culture (Or How I Learned To Hit Tab And Love The Python)"
date: '2008-03-31'
time: '22:31:32'
author: 'Daniel'
slug: 'indentations-effects-on-culture'
---

<p>First, a disclaimer, because that always makes for a winning start. (Ahem) DISCLAIMER: This effect may have been observed/documented by others before. If so, I apologize for being unoriginal.  But in well over 4 years of being in the Python community, I've never chanced across anything like it and it kinda just popped into my head the other day.  So please bear with me.</p>

<p>Next, the thesis. That way, some people can get the gist of this straight off, get livid and jump to the bottom only to discover I have implemented comments yet for them to rant it.</p>

<p>The thesis here is that by choosing to make indentation significant and by having a formalized recommend style guide, Python has created a community of like-minded individuals with much more similar tastes than most other languages. In essence, a sort of monoculture of values.</p>

<p>For instance, let's say Joe Programmer stumbles onto Python for the first time. Ignore for the moment if he likes or dislikes indentation as a way to delineate blocks.  When he goes through a couple different references (web, book, whatever), chances are very good that much of the code he looks at will look very similar, even if the code was created by wildly different authors. This lowers the barrier to entry significantly.</p>

<p>Additionally, the idea that "there's usually one good way to do it" will often yield similar code and structures from one project to the next. Performance implications are usually straight forward and can be found documented elsewhere with a little searching.</p>

<p>This is interesting to me because in the other communities I've been part of and the other languages I've worked with, this is really lacking. Ruby, PHP, Perl and even Javascript seem to always yield radically different code. Someone really likes "<code>class << self</code>" while someone else prefers all "<code>def self.method</code>". Loops get handled a different way every time, even within the same file. And no one seems to know if they like "<code>empty</code>", "<code>isset</code>" or just a straight boolean check with error suppression. It's made life as a beginner in those languages more difficult at times.</p>

<p>This is not to say those languages are bad (I happen to like Ruby and Javascript) but simply that they were more difficult for me to pick up and that I've witnessed the same effect with in others learning those languages. Python tends to frequently dodge the bullet in this regard.</p>

<p>So that covers the single user tooling along by himself, learning and building. And this has been covered by others in great detail. What amazes me is when you start looking at open source projects with some/many contributors. A great example to me is browsing the Django source. Granted that the core team is relatively picky about what they accept but the code is very similar. In comparison, several decent-sized PHP projects I've been on in the past have always become a mish-mash of coding styles before the project is even half complete. I attribute this to differing values, regardless of what values you view to be correct.</p>

<p>When I have time to further explore this line of thinking, I want to try doing a comparison between the code bases of applications with very different purposes, like a web framework and a desktop application. It will be interesting to note if the consistencies I have seen so far continue to reflect into other domains.</p>

<p>I'll try to get on adding a comment system next, ironically applying these exact thoughts as I peruse the source of 'django.contrib.comments'.</p>