---
title: 'Customizing The Admin: Part 1'
date: '2008-11-16'
time: '00:59:48'
author: 'Daniel'
slug: 'customizing-admin-part-1'
---

<p>For many people, one of Django's best selling points is the Admin app. And as wonderful as it is, there often comes a point where you need/want more. With the changes that landed for Django 1.0 (newforms-admin), adding what you want to the admin area has become a very manageable task.</p>

<p>This post will be the first in a short series of posts on customizing the Admin to your liking. Over the next several days, I plan to cover:</p>

<ul>
    <li>Customizing Admin Templates</li>
    <li>Adding Multiple Deletes</li>
    <li>Integrating Custom Javascript/CSS</li>
    <li>Altering Forms</li>
    <li>Adding Non-Model Related Functionality</li>
</ul>

<h3>Customizing Admin Templates</h3>

<p>Since the admin is just a Django application, if you understand Django's templating, you already know virtually everything you need to know to customize the look and feel of your admin area.</p>

<p>The default templates are located in <code>django.contrib.admin.templates.admin</code>. These templates follow the "three-level" convention suggested in the Django documentation, which means that the <code>base.html</code> defines in very basic terms how the entire admin ("sitewide") looks and is laid out, the <code>base_site.html</code> defines how the specific admin site ("sectionwide") is setup and the individual templates control their specific chuck of output.</p>

<p>A common goal in customizing the look of the admin is to make it match (or at least use similar colors) as the site itself, as well as customizing text to be specific to that site. So that's what we'll do, converting the generic Django admin into something... toastier. Let's get started.</p>

<h3>Setup</h3>

<p>Within your templates directory (or one of your template directories), you'll want to create a new, top-level directory called <code>admin</code>. If you're OK with Django's default styling, this is the only thing you will have to do for the templates.</p>

<p>If you want even further control of the admin CSS/images/Javascript, you'll have to copy the contents of <code>django.contrib.admin.media</code> to a place where your customized media can be served. Depending on your setup, this may be a new directory in your existing media or setting up a whole virtual host specific to serving this media. In addition, you will have to set your <code>ADMIN_MEDIA_PREFIX</code> to point to this location (path in first case or full URL for the second).</p>

<h3>Changing The Text</h3>

<p>This is perhaps the easiest customization to make to the admin. To change the "Django administration" text, simply copy the <code>django/contrib/admin/templates/admin/base_site.html</code> template to your <code>admin</code> directory in your templates directory and start editing it. You'll find a <code>{% trans %}</code> tag (which allows this text to be localized) with the "Django administration" text in it.</p>

<h4>Before:</h4>

<pre><code class="prettyprint">{% extends "admin/base.html" %}
{% load i18n %}

{% block title %}{{ title }} | {% trans 'Django site admin' %}{% endblock %}

{% block branding %}
&lt;h1 id="site-name"&gt;{% trans 'Django administration' %}&lt;/h1&gt;
{% endblock %}

{% block nav-global %}{% endblock %}
</code></pre>

<p>Simply replace it with what you want and save. In my case, I've replaced the title text as well because I'm anal-retentive like that.</p>

<h4>After:</h4>

<pre><code class="prettyprint">{% extends "admin/base.html" %}
{% load i18n %}

{% block title %}{{ title }} | {% trans 'Toast Driven Admin' %}{% endblock %}

{% block branding %}
&lt;h1 id="site-name"&gt;{% trans 'Toast Driven Admin' %}&lt;/h1&gt;
{% endblock %}

{% block nav-global %}{% endblock %}
</code></pre>

<p>This new text will now appear in both the admin login screen as well as all the internal admin pages.</p>

<h3>Changing The Styling</h3>

<p>The Django admin usually follows generally regarded web design best practices, so most of the CSS is kept out of the templates themselves and in an included CSS file. To apply some colors that are more in line with the site (in this case Toast Driven), we'll start by copying over the admin media and editing <code>layout.css</code> to modify the header colors.</p>

<h4>Before:</h4>

<pre><code class="prettyprint">...
#header { background:#417690; color:#ffc; overflow:hidden; }
#header a:link, #header a:visited { color:white; }
#header a:hover { text-decoration:underline; }
#branding h1 { padding:0 10px; font-size:18px; margin:8px 0; font-weight:normal; color:#f4f379; }
#branding h2 { padding:0 10px; font-size:14px; margin:-8px 0 8px 0; font-weight:normal; color:#ffc; }
...
</code></pre>

<p>The lines we're concerned with are the <code>#header</code> and <code>#branding h1</code> declarations. We'll change them like so:</p>

<h4>After:</h4>

<pre><code class="prettyprint">...
#header { background:#FAD9A4; color:#9A6002; overflow:hidden; }
#header a:link, #header a:visited { color:white; }
#header a:hover { text-decoration:underline; }
#branding h1 { padding:0 10px; font-size:18px; margin:8px 0; font-weight:bold; color:#9A6002; }
#branding h2 { padding:0 10px; font-size:14px; margin:-8px 0 8px 0; font-weight:normal; color:#9A6002; }
...
</code></pre>

<p>To get the tops of apps on the dashboard, you'll need to edit <code>global.css</code> like so:</p>

<h4>Before:</h4>

<pre><code class="prettyprint">...
.module h2, .module caption, .inline-group h2 { margin:0; padding:2px 5px 3px 5px; font-size:11px; text-align:left; font-weight:bold; background:#7CA0C7 url(../img/admin/default-bg.gif) top left repeat-x; color:white; }
...
</code></pre>

<h4>After:</h4>

<pre><code class="prettyprint">...
.module h2, .module caption, .inline-group h2 { margin:0; padding:2px 5px 3px 5px; font-size:11px; text-align:left; font-weight:bold; background-color:#9A6002; color:#9A6002; }
...
</code></pre>

<p>We have to remove the background image (as it is a gradient with the blue) in order to affect the color choice.</p>

<h3>Altering The Dashboard View</h3>

<p>Finally, you can reorganize the main page you're presented with when you login ("Home"). Simply copy the <code>index.html</code> template over to your admin template folder and override it to show apps in the order you want, leave apps out or change it in even more grandiose ways.</p>

<p><em>Note</em> - Django (before 1.0) used to have a command called <code><a href="http://www.djangobook.com/en/1.0/appendixG/">adminindex</a></code> that would generate a snippet corresponding to your current admin. This appears to no longer be present in Django 1.0, so you'll likely have to fall back on making changes to the existing template.</p>

<h3>Conclusion</h3>

<p>This is a bit outside my standard fare, so what I've presented here is simply what has worked for me in the past. I'd be open to hear different/better ways to handle admin look/feel customizations.</p>