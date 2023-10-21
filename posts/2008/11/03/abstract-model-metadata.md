---
title: 'Abstract Model Metadata'
date: '2008-11-03'
time: '18:00:00'
author: 'Daniel'
slug: 'abstract-model-metadata'
---

<p>Another recurring and important topic for me is metadata. Where possible, I like to add extra data about how the data came to be and what has happened to it. There are a lot of ways to tackle this (such as creating audit trails, versioning data, etc.) but something I always try to provide is a create date and last modified date. In conjunction with tying the change to a user, this can go a long way in providing useful information back to the user.</p>

<p>Not so long ago, I would manually add these kinds of fields to my objects. However, in the weeks before <a href="http://www.djangoproject.com/">Django 1.0</a>, model inheritance was one of the improvements that landed with QuerySet-refactor. It turns out that this is a very good way to add our metadata.</p>

<p>We'll start with the same initial code from <a href="http://toastdriven.com/fresh/safer-deletes/">yesterday's entry</a>.</p>

<pre><code class="prettyprint">from django.db import model
from django.contrib.auth.models import User

class Contact(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    email = models.EmailField()
</code></pre>

<p>Instead of manually adding the created/updated fields to this model (and having to do it again for every model we create after this), let's build something we can reuse. We'll create a <code>StandardMetadata</code> class that we can inherit from in our models. The new code would look something like this:</p>

<pre><code class="prettyprint">import datetime
from django.db import model
from django.contrib.auth.models import User

class StandardMetadata(models.Model):
    created = models.DateTimeField(default=datetime.datetime.now)
    updated = models.DateTimeField(default=datetime.datetime.now)
    
    class Meta:
        abstract = True

class Contact(StandardMetadata):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    email = models.EmailField()
</code></pre>

<p>Our changes are relatively straight-forward. We're now importing <code>datetime</code>, we've built a new <code>StandardMetadata</code> model that contains the fields we want and we've changed what class <code>Contact</code inherits from. Note that other than changing what <code>Contact</code> inherits from, we've made no other changes to the model. However, that model newly has created/updated fields.</p>

<p>The trick here lies in <code>StandardMetadata</code>'s inner <code>Meta</code> class. The <code>abstract = True</code> declaration tells Django not to create a table for this model but to add those fields to any table that inherits from this class. Without this, Django would create a table for <code>StandardMetadata</code> and perform a OneToOneField join on any inheriting objects.</p>

<p>This is an improvement, but let's take this a step further and make sure that <code>updated</code> gets automatically handled when any subclassing model gets saved. The code would now look like:</p>

<pre><code class="prettyprint">import datetime
from django.db import model
from django.contrib.auth.models import User

class StandardMetadata(models.Model):
    created = models.DateTimeField(default=datetime.datetime.now)
    updated = models.DateTimeField(default=datetime.datetime.now)
    
    class Meta:
        abstract = True
    
    def save(self, *args, **kwargs):
        self.updated = datetime.datetime.now()
        super(StandardMetadata, self).save(*args, **kwargs)

class Contact(StandardMetadata):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    email = models.EmailField()
</code></pre>

<p>We've overridden <code>Model</code>'s built-in <code>save()</code> method to automatically update the <code>updated</code> field. Now any subclass can save and also have its <code>updated</code> set to the current date &amp; time.</p>

<p>Finally, we can take this even one step further and use this concept to improve on yesterday's "safer delete" functionality. We'll push the handling of "active" into our <code>StandardMetadata</code> class, allowing any subclass to also inherit this.</p>

<pre><code class="prettyprint">import datetime
from django.db import model
from django.contrib.auth.models import User

class StandardMetadata(models.Model):
    created = models.DateTimeField(default=datetime.datetime.now)
    updated = models.DateTimeField(default=datetime.datetime.now)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        abstract = True
    
    def save(self, *args, **kwargs):
        self.updated = datetime.datetime.now()
        super(StandardMetadata, self).save(*args, **kwargs)
    
    def delete(self, *args, **kwargs):
        self.is_active = False
        self.save()

class ActiveManager(models.Manager):
    def get_query_set(self):
        return super(ContactActiveManager, self).get_query_set().filter(is_active=True)

class Contact(StandardMetadata):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    email = models.EmailField()
    
    objects = models.Manager()
    active = ActiveManager()
</code></pre>

<p>We've put the <code>is_active</code> field into the <code>StandardMetadata</code> class and pulled the <code>delete()</code> method in as well. We've also renamed the <code>ContactActiveManager</code> class to <code>ActiveManager</code>, as we can now reuse this same manager on <em>any</em> class that inherits from <code>StandardMetadata</code>.</p>

<p>This is a lot more code for a simple example, but once you start adding in more objects, the amount of typing (and worse, copy/pasting) you'll save makes it very worthwhile.</p>