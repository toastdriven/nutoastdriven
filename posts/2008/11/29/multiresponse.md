---
title: 'MultiResponse'
date: '2008-11-29'
time: '17:05:56'
author: 'Daniel'
slug: 'multiresponse'
---

<p>As promised, here's the snippet of code I've been playing with. The behavior is that a client makes a request on your site but the request could be for any of several mime types. Perhaps they want to view the web page in their browser (HTML) or they're pulling in data (via XML or JSON). Serving up each one of these request via a different view is a lot of work and/or a lot of copy-paste for the same data, different templates.</p>

<p>So instead, you create a single view to handle all of the different request types and use a <code>MultiResponse</code> to serve them up. You register all the different types of content that URL/view will serve and let <code>MultiResponse</code> return the correct response.</p>

<h3>multiresponse.py</h3>

<pre><code class="prettyprint">from django.conf import settings
from django.shortcuts import render_to_response


ACCEPT_HEADER_MAPPING = {
    'text/html': 'html',
    'application/xml': 'xml',
    'text/xml': 'xml', # Broken but we're including it.
    'application/json': 'json',
    'text/plain': 'text',
}


class MultiResponse(object):
    """
    MultiReponse allows you to register different mime types and their templates
    and respond intelligently type to what the client requests.

    Templates must be registered with this class for use in combination with
    the mime type they serve. The mime types may be any of:

        * ``html``
        * ``xml``
        * ``json``
        * ``txt``

    If no appropriate match is found in the "Accept" header, the default mime
    type will be served.
    """
    def __init__(self, request):
        self.request = request
        self.templates = {}
        self.default_type = 'html'
        self.accept_header_mapping = ACCEPT_HEADER_MAPPING
        
        if hasattr(settings, 'ACCEPT_HEADER_MAPPING'):
            self.accept_header_mapping.update(settings.ACCEPT_HEADER_MAPPING)
    
    def client_accepted_mime_types(self):
        accepted_mime_types = []
        
        for mime in self.request.META.get('HTTP_ACCEPT').split(','):
            mime_no_whitespace = mime.strip()
            mime_info = mime_no_whitespace.split(';')
            # We don't handle levels/qualities right now, though we should eventually.
            cleaned_mime = mime_info[0]
            accepted_mime_types.append(cleaned_mime)
        
        return accepted_mime_types
    
    def register(self, mime_type, template, default=False):
        """
        Registers a mime type and corresponding template.
        
        By default, the first type registered becomes the default. You can
        override this by passing the third argument ``default`` as ``True`` on
        a later call as desired.
        """
        if self.templates == {} or default is True:
            self.default_type = mime_type
        
        self.templates[mime_type] = template
    
    def determine_extension(self):
        """Attempt to intelligently discern from the URL what the desired 
        extension is."""
        desired_extension = None
        request_path_pieces = [piece for piece in self.request.path.split('/') if piece != '']
        
        try:
            # Just look at the last bit.
            extension = request_path_pieces.pop()
            
            if extension in self.templates.keys():
                desired_extension = extension
        except IndexError:
            # Fail silently.
            pass
        
        return desired_extension
    
    def render(self, context=None, **kwargs):
        """Renders the desired template with the context. Accepts the same
        kwargs as render_to_response."""
        desired_template = ''
        content_type = 'text/html'
        
        if self.templates == {}:
            raise RuntimeError('You must register at least one mime type and template with MultiResponse before rendering.')
        
        if 'HTTP_ACCEPT' in self.request.META:
            extension = self.determine_extension()
            
            if extension in self.templates.keys():
                for mime in self.client_accepted_mime_types():
                    if mime in self.accept_header_mapping and self.accept_header_mapping[mime] == extension:
                        content_type = mime
                        desired_template = self.templates[extension]
                        break
    
        if not desired_template:
            try:
                desired_template = self.templates.get(self.default_type)
            except KeyError:
                raise RuntimeError('The default mime type could not be found in the registered templates.')
    
        response = render_to_response(desired_template, context, **kwargs)
        response['Content-Type'] = "%s; charset=%s" % (content_type, settings.DEFAULT_CHARSET)
        return response

</code></pre>

<p>Drop that into a file and import it into your views. Usage would look like:</p>

<pre><code class="prettyprint">from django.conf import settings
from django.shortcuts import render_to_response
from test.multiresponse import MultiResponse

def index(request, extension):
    sample_people = [
        {'name': 'Daniel', 'age': 26},
        {'name': 'John', 'age': 26},
        {'name': 'Jane', 'age': 20},
        {'name': 'Bob', 'age': 35},
    ]
    
    mr = MultiResponse(request)
    mr.register('html', 'index.html')
    mr.register('xml', 'people.xml')
    mr.register('json', 'people.json')
    return mr.render({
        'people': sample_people,
    })

</code></pre>

<p>The last bit (and only immediate downside to me of this) is the modifications you have to make to your URLconf. My test one looks like:</p>

<pre><code class="prettyprint">from django.conf.urls.defaults import *

urlpatterns = patterns('',
    (r'^(\w{3,4})?/?$', 'test.views.index'),
)
</code></pre>

<p>The <code>(\w{3,4})?/?</code> bit is necessary to match the different extensions one could provide. I really don't care for this and there are two other alternatives:</p>

<pre><code class="prettyprint">from django.conf.urls.defaults import *

urlpatterns = patterns('',
    (r'^$', 'test.views.index'),
    (r'^html/$', 'test.views.index'),
    (r'^xml/$', 'test.views.index'),
    (r'^json/$', 'test.views.index'),
    
    # ... or ...
    
    # Careful, this matches quite a bit... Make sure it comes last among like URLs.
    (r'^', 'test.views.index'),
)
</code></pre>

<p>I'd love to find a way around this but nothing obviously jumps out at me right now. There's some fun possibilities in this, such as extension to handle mobile/iPhone sites, Ajax-ifying an interface based around the existing pages in an app, etc.</p>

<p>The code is MIT licensed and will soon find its way into version control but for now this will do. For reference, it's loosely based around similar functionality, called <code><a href="http://api.rubyonrails.org/classes/ActionController/MimeResponds/InstanceMethods.html">respond_to</a></code> in Rails. I'd love any feedback anyone has.</p>