---
title: 'Customizing The Admin: Part 3'
date: '2008-11-23'
time: '23:10:31'
author: 'Daniel'
slug: 'customizing-admin-part-3'
---

<p>This entry in the "Customizing The Admin" mini-series is a basically a quick tip but has tons of potential. The <code>ModelAdmin</code>s that make up the admin area can take many arguments to customize the how admin works, but the most flexible of these is the <code>form</code> option. You can use this to override the default behavior, which is to use a <code>ModelForm</code> for model the <code>ModelAdmin</code> is registered with, by providing your own form instead. An example:</p>

<pre><code class="prettyprint">from django.contrib import admin
from django.core.cache import cache
from django import forms
from blog.models import Post


class CachedPostForm(forms.ModelForm)
    class Meta:
        model = Post
    
    def save(self):
        post = super(CachedPostForm, self).save()
        # This could also be done by overriding the model's save method, 
        # via a post_save signal or in the view on accessing the post.
        # Equally, the cache_key should probably be generated in the model 
        # so that it can be accessed elsewhere without code duplication.
        cache_key = "posts:%s" % post.id
        cache.set(cache_key, post, 3600)


class PostAdmin(admin.ModelAdmin):
    form = CachedPostForm
    list_display = ('title', 'tease', 'author', 'created')
    search_fields = ('title', 'content')

admin.site.register(Post, PostAdmin)
</code></pre>

<p>The form you provide should be a subclass of <code>ModelForm</code> (which extends <code>Form</code> so any <code>Form</code> tricks will work) or bad things can happen. You can use this technique to add validation, provide additional custom processing, verify/maintain data integrity, et cetera.</p>