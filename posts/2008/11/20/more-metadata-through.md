---
title: 'More Metadata With "Through"'
date: '2008-11-20'
time: '00:09:12'
author: 'Daniel'
slug: 'more-metadata-through'
---

<p>I've professed my love of metadata before and one of my new favorite features in Django is the addition of <code><a href="http://docs.djangoproject.com/en/dev/topics/db/models/#extra-fields-on-many-to-many-relationships">through</a></code> on <code>ManyToManyField</code> relationships. I almost missed this addition when it happened (caught via <a href="http://blog.michaeltrier.com/2008/7/29/django-gets-intermediate-models">Michael Trier's post</a>) and it hasn't gotten much attention since, which I think is a bit unfortunate.</p>

<p>A standard <code>ManyToManyField</code> creates a simple join table with three columns (an <code>id</code> column and two foreign key columns) which is fine for many cases. However, there are times where you want to track additional information about the relationship. Some example use cases include:</p>

<ul>
    <li>created/updated times (for generally tracking how "fresh" the relationship is),</li>
    <li>Authors to Blogs/Articles (type of authorship like 'primary', 'guest', 'editor'),</li>
    <li>Users to Songs (which could store ratings, play count, favorite status),</li>
    <li>and of course the obligatory social networking reference in Users (self-referential through Contacts with details about who initiated the contact, acceptance date, how they know each other, et cetera).</li>
</ul>

<p>I considered providing code samples here of usage but the <a href="http://docs.djangoproject.com/en/dev/topics/db/models/#extra-fields-on-many-to-many-relationships">docs</a> really seem to provide a pretty complete so I don't think there's much I could add of value.</p>

<p>Hopefully, this has gotten the bit of writer's block I've got out of my system. I've been stewing on this for weeks now, and though I don't think I've done it justice, at least I've put it out there because I think it's pretty neat. Onward and upward.</p>