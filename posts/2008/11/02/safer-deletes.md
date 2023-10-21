---
title: 'Safer Deletes'
date: '2008-11-02'
time: '13:04:43'
author: 'Daniel'
slug: 'safer-deletes'
---

<p>As a developer, I'm big on the persistence of data and helping make users' lives better/easier where I can. One of the pain points I have come across time and again stems from the most dangerous action a user can take on an application: using the "Delete" functionality. Accidental clicks, trying to correct a mistake or just not fully understanding how deleting can affect related data has bitten many people using applications.</p>

<p>Far from being a <a href="http://www.djangoproject.com/">Django</a>-specific topic, this applies to all web applications and beyond. We live in a time where computing resources are cheap and (especially storage) vast. So we should take advantage of this space if we can make users' lives better.</p>

<p>The core idea here is simple: <strong>don't actually delete data from your data store, simply mark as deleted and filter all user views to only show active items.</strong> To make this a little more clear (and because I learn best from examples), I'll show a little Django code to demonstrate this. We'll start with the following code (that uses real deletes).</p>

<pre><code class="prettyprint">from django.db import model
from django.contrib.auth.models import User

class Contact(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    email = models.EmailField()
</code></pre>

<p>This first step is to push the "delete" functionality down as deeply in the code as makes sense. With Django, it makes the most sense to place this in the model object code. We'll override the default behavior of performing a true delete with one that marks an object as deleted. This is done by adding an attribute that serves as the "is_active" flag and overriding the parent's <code>delete()</code> method. So our code now becomes:</p>

<pre><code class="prettyprint">from django.db import model
from django.contrib.auth.models import User

class Contact(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    email = models.EmailField()
    is_active = models.BooleanField(default=True)
    
    def delete(self, *args, **kwargs):
        self.is_active = False
        self.save()
</code></pre>

<p>Now, any time a <code>delete()</code> is called on a <code>Contact</code> object, it will simply mark the object and save it.</p>

<p>This is, however, only half the solution. Left this way, the user will try to delete a contact, see a successful deletion, but the object will still be present everywhere the object may be displayed. Even more confusion can result from this, so let's handle the other side of things, presenting the data to the user.</p>

<p>We could do one-offs everywhere the object is used, but this would be labor-intensive, painful and error-prone. Instead, we'll take advantage of Django's built-in Managers and add a new one to the <code>Contact</code> model to represent all "active" objects. Our code now becomes:</p>

<pre><code class="prettyprint">from django.db import model
from django.contrib.auth.models import User

class ContactActiveManager(models.Manager):
    def get_query_set(self):
        return super(ContactActiveManager, self).get_query_set().filter(is_active=True)

class Contact(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    email = models.EmailField()
    is_active = models.BooleanField(default=True)
    
    objects = models.Manager()
    active = ContactActiveManager()
    
    def delete(self, *args, **kwargs):
        self.is_active = False
        self.save()
</code></pre>

<p>Some things to note on the changes. One, the custom manager we've added is very simple in that it extends its parent's behavior and then simply filters to make sure it only includes "active" objects. We then attach it in the model with <code>active = ContactActiveManager()</code>.</p>

<p>Also, we've left the default manager in place with <code>objects = models.Manager()</code>. I've done this for a couple reasons. The first is that an admin can access all data, deleted or not, as normal from the admin area. This allows for quick data recovery in the event of an accidental delete. It also gives you more flexibility if you need to programmatically access all data, deleted or not. And it prevents new programmers who are picking up your code from confusion about how exactly <code>Contact.objects.whatever</code> behaves.</p>

<p>Now the only thing that is left is to replace all instances in your view code from <code>Contact.objects.whatever</code> to <code>Contact.active.whatever</code>. This can be done by a global find/replace fairly easily.</p>

<p>As with everything, there are shortcomings with this technique. You'll need to remember to always use the <code>active</code> manager instead of </code>objects</code>. As you use this technique throughout your code, this usage becomes more natural. This also does NOT handle some of the table-wide methods used by <code>QuerySets</code> (such as many-to-many methods) as those may use more efficient SQL queries instead of calling the <code>delete()</code> method on each object. Your recent Django source is the best reference in this matter.</p>

<p>Once this groundwork is in place, you can easily develop new functionality (like undo) throughout your application.</p>