---
title: 'Customizing The Admin: Part 2'
date: '2008-11-21'
time: '00:02:24'
author: 'Daniel'
slug: 'customizing-admin-part-2'
---

<p>On of the <a href="http://www.djangopony.com/">pony requests</a> that can up prominently at <a href="http://djangocon.org/">DjangoCon 2008</a> was the request for multiple deletes in the changelist of the admin. Thanks to newforms-admin, we can roll our own. Rather than go through step by step, I'm going to simply present everything needed to get a basic version going. Let's get started.</p>

<h3>Subclass ModelAdmin</h3>

<p>Since we need to override the changelist functionality, we're going to start by subclassing <code>ModelAdmin</code>, which does all the heavy lifting in the admin area. You can place this code anywhere (in any of your <code>admin.py</code>s, in it's own file, whatever) but will need to remember to import it from there anywhere you want to use it.</p>

<pre><code class="prettyprint">from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django import template
from django.utils.encoding import force_unicode
from django.utils.translation import ugettext as _

class MultiDeleteModelAdmin(admin.ModelAdmin):
    def changelist_view(self, request, extra_context=None):
        "The 'change list' admin view for this model."
        from django.contrib.admin.views.main import ChangeList, ERROR_FLAG
        
        opts = self.model._meta
        app_label = opts.app_label
        
        if not self.has_change_permission(request, None):
            raise PermissionDenied
        
        if request.POST:
            # Check to see if we can delete this type of object.
            if not self.has_delete_permission(request):
                raise PermissionDenied
            
            # Start with an empty list.
            ids_to_delete = []
            
            for key in request.POST:
                # Look through all the post keys for objects to delete.
                if key.startswith('delete_obj_'):
                    obj_id = int(key.replace('delete_obj_', ''))
                    ids_to_delete.append(obj_id)
            
            # Dust off and nuke 'em from orbit.        
            objects_to_delete = self.model._default_manager.filter(pk__in=ids_to_delete)
            
            for obj in objects_to_delete:
                obj_display = force_unicode(obj)
                obj.delete()
                self.log_deletion(request, obj, obj_display)
                
            self.message_user(request, _('The desired %(name)s objects were deleted successfully.' % {'name': force_unicode(opts.verbose_name)}))
            
            if not self.has_change_permission(request, None):
                return HttpResponseRedirect("../../")
            return HttpResponseRedirect(request.path)
        
        try:
            cl = ChangeList(request, self.model, self.list_display, self.list_display_links, self.list_filter,
                self.date_hierarchy, self.search_fields, self.list_select_related, self.list_per_page, self)
        except IncorrectLookupParameters:
            # Wacky lookup parameters were given, so redirect to the main
            # changelist page, without parameters, and pass an 'invalid=1'
            # parameter via the query string. If wacky parameters were given and
            # the 'invalid=1' parameter was already in the query string, something
            # is screwed up with the database, so display an error page.
            if ERROR_FLAG in request.GET.keys():
                return render_to_response('admin/invalid_setup.html', {'title': _('Database error')})
            return HttpResponseRedirect(request.path + '?' + ERROR_FLAG + '=1')

        context = {
            'title': cl.title,
            'is_popup': cl.is_popup,
            'cl': cl,
            'has_add_permission': self.has_add_permission(request),
            'root_path': self.admin_site.root_path,
            'app_label': app_label,
        }
        context.update(extra_context or {})
        return render_to_response(self.change_list_template or [
            'admin/%s/%s/change_list.html' % (app_label, opts.object_name.lower()),
            'admin/%s/change_list.html' % app_label,
            'admin/change_list.html'
        ], context, context_instance=template.RequestContext(request))
</code></pre>

<p>Mostly, this is a copy/paste of what's in ModelAdmin, with the exception of now processing a POST to the changelist for the deletion. We check to make sure the user has delete permissions, collect all the possible object ids we'll need to delete and delete them.</p>

<p>The only change required to your actual admin classes is to change where it inherits from. So for example:</p>

<pre><code class="prettyprint"># Was: class TweetAdmin(admin.ModelAdmin):
class TweetAdmin(MultiDeleteModelAdmin):
    date_hierarchy = 'created'
    list_display = ('user', 'message', 'created')
    search_fields = ('message',)
</code></pre>

<h3>Template Tags</h3>

<p>In order to enable the templates to work properly, we have to override a couple of the template tags that help display the list of items in the changelist. Drop this code into a template tag file called <code>admin_multidelete.py</code>.</p>

<pre><code class="prettyprint">from django import template
from django.contrib.admin.templatetags.admin_list import result_headers, items_for_result

register = template.Library()

def results_multidelete(cl):
    for res in cl.result_list:
        yield dict(pk=getattr(res, cl.pk_attname), field_list=list(items_for_result(cl,res)))

def result_list_multidelete(cl):
    return {'cl': cl,
            'result_headers': list(result_headers(cl)),
            'results': list(results_multidelete(cl))}
result_list_multidelete = register.inclusion_tag("admin/change_list_results.html")(result_list_multidelete)

</code></pre>

<p>Fairly straightforward here, and again mostly copy/paste. The difference it that we need the object <code>pk</code> in the result list so we have to shunt that into <code>results_multidelete</code> and change the call to this function in <code>result_list_multidelete</code>.</p>

<h3>Templates</h3>

<p>Finally, we need to change the templates. Within your <code>templates</code> directory, create an <code>admin</code> directory. Within it, place the following two files.</p>

<h4>change_list.html</h4>

<pre><code class="prettyprint">{% extends &quot;admin/base_site.html&quot; %}
{% load adminmedia admin_list i18n %}

{% block extrastyle %}&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;{% admin_media_prefix %}css/changelists.css&quot; /&gt;{% endblock %}

{% block bodyclass %}change-list{% endblock %}

{% if not is_popup %}{% block breadcrumbs %}&lt;div class=&quot;breadcrumbs&quot;&gt;&lt;a href=&quot;../../&quot;&gt;{% trans &quot;Home&quot; %}&lt;/a&gt; &amp;rsaquo; &lt;a href=&quot;../&quot;&gt;{{ app_label|capfirst }}&lt;/a&gt; &amp;rsaquo; {{ cl.opts.verbose_name_plural|capfirst }}&lt;/div&gt;{% endblock %}{% endif %}

{% block coltype %}flex{% endblock %}

{% block content %}
&lt;div id=&quot;content-main&quot;&gt;
{% block object-tools %}
{% if has_add_permission %}
&lt;ul class=&quot;object-tools&quot;&gt;&lt;li&gt;&lt;a href=&quot;add/{% if is_popup %}?_popup=1{% endif %}&quot; class=&quot;addlink&quot;&gt;{% blocktrans with cl.opts.verbose_name as name %}Add {{ name }}{% endblocktrans %}&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;
{% endif %}
{% endblock %}
&lt;div class=&quot;module{% if cl.has_filters %} filtered{% endif %}&quot; id=&quot;changelist&quot;&gt;
{% block search %}{% search_form cl %}{% endblock %}
{% block date_hierarchy %}{% date_hierarchy cl %}{% endblock %}

{% block filters %}
{% if cl.has_filters %}
&lt;div id=&quot;changelist-filter&quot;&gt;
&lt;h2&gt;{% trans &#x27;Filter&#x27; %}&lt;/h2&gt;
{% for spec in cl.filter_specs %}
   {% admin_list_filter cl spec %}
{% endfor %}
&lt;/div&gt;
{% endif %}
{% endblock %}

{% load admin_multidelete %}
&lt;form method=&quot;post&quot; action=&quot;.&quot;&gt;
{% block result_list %}{% result_list_multidelete cl %}{% endblock %}    
{% block pagination %}{% pagination cl %}{% endblock %}
&lt;p&gt;&lt;input type=&quot;submit&quot; value=&quot;Delete Selected&quot; /&gt;&lt;/p&gt;
&lt;/form&gt;

&lt;/div&gt;
&lt;/div&gt;
{% endblock %}
</code></pre>

<p>... and ...</p>

<h4>change_list_results.html</h4>

<pre><code class="prettyprint">{% if results %}
&lt;table cellspacing=&quot;0&quot;&gt;
&lt;thead&gt;
&lt;tr&gt;
    &lt;th&gt;&amp;nbsp;&lt;/th&gt;
{% for header in result_headers %}&lt;th{{ header.class_attrib }}&gt;
{% if header.sortable %}&lt;a href=&quot;{{ header.url }}&quot;&gt;{% endif %}
{{ header.text|capfirst }}
{% if header.sortable %}&lt;/a&gt;{% endif %}&lt;/th&gt;{% endfor %}
&lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
{% for result in results %}
&lt;tr class=&quot;{% cycle &#x27;row1&#x27; &#x27;row2&#x27; %}&quot;&gt;
    &lt;td&gt;&lt;input type=&quot;checkbox&quot; name=&quot;delete_obj_{{ result.pk }}&quot; value=&quot;1&quot; /&gt;&lt;/td&gt;
    {% for item in result.field_list %}
        {{ item }}
    {% endfor %}
&lt;/tr&gt;
{% endfor %}
&lt;/tbody&gt;
&lt;/table&gt;
{% endif %}
</code></pre>

<p>Again, mostly copy/paste. We wrap the list within <code>change_list.html</code> in a form (to contain our checkboxes) and output the checkboxes in the results in <code>change_list_results.html</code>.</p>

<h3>The Result</h3>

<p><a href="http://media.toastdriven.com/images/Multidelete.png"><img src="http://media.toastdriven.com/images/MultideleteThumbnail.png" alt="Multidelete"></a></p>

<p>This approach is not without shortcomings. A couple immediate improvements spring to mind. One, support for non-numeric primary keys would need to be added. Two, a confirmation page to display all the objects about to be removed would be nice (and consistent with the rest of the admin). Three, this is untested with a large set of objects. Four, general cleanup of the code (especially the template tags/templates), much more testing and streamlining of things would be nice.</p>

<p>I am eager for an official implementation but this goes to show the flexibility we have with newforms-admin and the relative ease in putting this kind of feature together. I'd love whatever feedback anyone has.</p>