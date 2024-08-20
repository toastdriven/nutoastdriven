---
title: 'Released: django-microapi!'
date: '2023-12-01'
time: '09:10:43'
author: 'Daniel'
slug: 'released-django-microapi'
---

I released a small library yesterday, [django-microapi][django-microapi]. I just wanted to talk a little further about the rationale, what it's good for, and what it's not good for.

## Rationale, or Why _Another_ HTTP API Library?

If you know anything about my open-source, you'll likely be aware that I've produced not one, but _TWO_ other RESTful HTTP API frameworks in the past, [django-tastypie][django-tastypie] and [restless][restless]. Not to mention, I've spent a fair amount of professional time recently using other libraries/frameworks, such as [django-rest-framework][drf], [FastAPI][fastapi], and [django-ninja][ninja].

So _why on Earth_ would I work on & release _yet another_ HTTP API library for [Django][django]?

First, some backstory. To be frank, beyond a couple projects, I never really got to **use** either Tastypie or Restless. They were clearly useful to others, and I spent hundreds of hours supporting other people's use of them. But when you aren't using your own projects & just supporting others, it's easy to lose both enthusiasm and vision. To that end, I tried to bring in other maintainers, including people actually getting use out of them.

I'm not really going to significantly comment on [DRF][drf], [FastAPI][fastapi], or [Django-Ninja][ninja] here; beyond saying that I think they're all interesting and fine. I don't like being negative about other people's open-source, and each of their popularity speaks for itself.

### The Real Reason

The **real reason** for [django-microapi][django-microapi] is that my (desired) approach to building APIs has changed.

* I build mostly semi-private APIs, where there's only a couple consumers (mostly a Javascript frontend).
* I don't need many/most of the features these libraries include (e.g. [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS), full `PATCH` support, [OpenAPI](https://swagger.io/specification/), related objects, etc.).
* I spend too much time fighting opinionated serialization.

And the more I build spent building APIs, the more time I also spend trying to understand complex implementation details & trying to override behavior that doesn't work for me.

So let's stop fighting the frameworks, and write a library to embelish normal Django views instead...

### Simple Views

When I started with [Django][django] back in 2008, one of the initial draws was how simple/delightful the function-based views were. A couple lines, only what was needed & nothing more, and you were responding to HTTP requests.

```
from django.shortcuts import render


def hello(request):
    name = request.GET.get("name", "world")
    return render(request, "greeting.html", {
        "name": name,
    })
```

Fast forward to today, and I longed for that simplicity again, but for APIs. It's slightly more clumsy to do with functions, as you have to support all the different HTTP verbs in a single function.

So we look to class-based views (`CBVs`), and most of what I want is already present in [Django][django]'s `django.views.generic.base.View`, including that delightful simplicity.

But there's a catch. Django's views are built with _normal_ HTML conventions (rendering HTML, form POSTs, Django templates, etc.) in mind. Which are fantastic & flexible! But writing JSON HTTP APIs are more involved, and there's a lot of repetitive boilerplate.

### With Plain `View`s

For example, let's look at a basic RESTful list endpoint using `View`. `GET` returns a list of all objects, `POST` creates a new one.

```
# Gotta import this everywhere.
import json

# Gotta import this everywhere, & you lose `django.shortcuts`.
from django.http import JsonResponse
# Import a (pretty buried) view.
from django.views.generic.base import View

from myblog.models import BlogPost


class BlogPostListView(View):
    def get(self, request):
        posts = BlogPost.objects.all()
        data = {
            "success": True,
            "posts": [],
        }

        # Handling list serializations can be verbose.
        for post in posts:
            data.append({
                "id": post.id,
                "title": post.title,
                "slug": post.slug,
                "content": post.content,
                "publish_date": post.publish_date,
            })

        return JsonResponse(data)

    def post(self, request):
        # Gotta try/except the load, to return **JSON** error responses!
        # Otherwise, Django will return HTML, which isn't friendly when the
        # client is assuming JSON for everything.
        try:
            # There aren't any JSON shortcuts on `request`, so we have to do
            # this semi-complex invocation all over the place.
            data = json.loads(request.body.read())
        except ValueError:
            return JsonResponse({
                "success": False,
                "errors": [
                    "Invalid JSON payload."
                ],
            })

        # TODO: Ought to validate the data here.

        post = BlogPost.objects.create(
            title=data["title"],
            slug=data["slug"],
            content=data["content"],
            publish_date=data["publish_date"],
        )
        resp_data = {
            "success": True,
            "post": {
                "id": post.id,
                "title": post.title,
                "slug": post.slug,
                "content": post.content,
                "publish_date": post.publish_date,
            },
        }
        # The attribute is `status_code`, but the kwarg name is `status`.
        # Enjoy this disparity when you're writing your tests!
        return JsonResponse(resp_data, status=201)

```

That's... a non-trivial amount of code if we want to use plain old `View`. There's also some key omissions, such as: catching all `Exception`s & returning JSON errors, centralizing validation/serialization logic, etc. And most of that would have to get duplicated to the _next_ list endpoint, with just a couple lines of business logic changes.

> **Note:** Yes, there are ways to DRY this up and shorten the code. I left things expanded for clarity in what's going on & to show all the concerns. In essence, `django-microapi` _is_ that DRY layer.


### With `django-microapi`

Now, for how `django-microapi` shortens/cleans things up. **Spoiler alert:** It basically just addresses all the repetitive parts that were commented on above.

```
from microapi import ApiView, ModelSerializer

from .models import BlogPost


class BlogPostView(ApiView):
    def get(self, request):
        posts = BlogPost.objects.all()
        return self.render({
            "success": True,
            "posts": self.serialize_many(posts),
        })

    def post(self, request):
        data = self.read_json(request)

        # TODO: Validate the data here.

        serializer = ModelSerializer()
        post = serializer.from_dict(BlogPost(), data)
        post.save()

        return self.render({
            "success": True,
            "post": self.serialize(post),
        })
```

All the painful/reptitive code has been streamlined down to the simpler calls. Handling errors the right way is built-in. And a basic/straightforward serializer, while completely optional, is included.


## What It's Good For?

* Small APIs, with a handful of endpoints
* Mostly-private APIs, where you're both producer & consumer
* Heavily customized endpoints, where you need deep control over what/how things execute and/or extensively-modified output
* You want a small, well-documented, easily-understood codebase


## What It's Not Good For?

* If you're producing a large API with many endpoints, it's an unknown quantity at this point. My biggest Real Life™ usage currently sits at ~15-20 endpoints, supporting ~35 verbs.
* If your API will public and/or have a lot of consumers.
* If you will be auto-generating clients (& making heavy use of OpenAPI).
* If your needs are simple, require little customization, and/or you just don't want to spend much time on the API.
* You want a big community with lots of support.


## Conclusion

`django-microapi` is largely for me & built around my tastes. I'm currently using on it on a long-lived project, where I'm the primary maintainer.

I'm not going to make a big sell-job of it, or say that you _should_ use it. But options are good; and if it helps even one other person, then the time spent releasing/maintaining it will be worthwhile.

Enjoy!


[django]: https://djangoproject.com/
[django-microapi]: https://github.com/toastdriven/django-microapi
[django-tastypie]: https://tastypieapi.org/
[restless]: https://restless.rtfd.io/
[drf]: https://www.django-rest-framework.org/
[FastAPI]: https://fastapi.tiangolo.com/
[ninja]: https://django-ninja.dev/
