---
title: 'Django, fetch, and CORS'
date: '2024-08-20'
time: '09:36:11'
author: 'Daniel'
slug: 'django-fetch-and-cors'
---

_Tell me if this sounds familiar:_ Every so often (typically on a new/fresh codebase), I'll be writing frontend code (using [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)) to hit a backend API. Things are going smooth, backend is passing tests, I've re-written this `apiRequest` code for the 1000th time:

```js
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export async function apiRequest(url, method = 'get', data = null, headers = null) {
  let reqHeaders = { ...defaultHeaders };

  if (headers !== null) {
    reqHeaders = { ...headers };
  }

  const reqOpts = {
    method: method.toUpperCase(),
    credentials: 'include',
    headers: reqHeaders,
  };

  if (data !== null) {
    reqOpts.body = JSON.stringify(data);
  }

  const resp = await fetch(url, reqOpts);

  if (!resp.ok) {
    throw new Error('Request failed')
  }

  return resp;
}
```

I write that first use of the API code, looking nice & clean:

```js
export async function getPosts() {
  const url = `${rootUrl}/api/posts/`;
  const resp = await apiRequest(url);
  return await resp.json();
}
```

Then I go to test in browser, & 💥**BAM**💥 in the Inspector:

> `localhost:8000 - OPTIONS - CORS Missing Allow Origin`

_Wait. Wait wait wait. **WHAT?**_

I'm not doing an `OPTIONS` request, I'm doing a `GET`. And why the hell is it failing a CORS check? WHAT'S GOING ON?!!1!

<br>
<hr>
<br>

### The "Who"/"What"

So the situation is clear, this usually arises when:

* I'm running the backend code on one port (say `localhost:8000`)
* I'm running the frontend code on a different port (say `localhost:5173`)
* Again, probably a fresh codebase on both sides
* ...And I'm "out-of-shape" from only doing backend work professionally for the last 6-12 months, because they hired me as a "Full-Stack Engineer" in name-only...

> **Note:** Speaking of which, as of the time of writing, I'm **available for hire!** If you like the content of this post, & think working with me might be neat, [hit me up](mailto:daniel@toastdriven.com)!

### The "Why" (In Brief)

`CORS` (_"Cross-Origin Resource Sharing"_) is a protection mechanism for the modern web. The idea here is to _enforce policy_ around making requests across _different domains_ (in a way that wouldn't break old servers/browsers).

Effectively, if the browser is trying to do something modern (e.g. use all the RESTful verbs like `PUT`/`PATCH`/`DELETE`, make a request with an `application/json` content-type, or supply special/extra headers), extra checks are done by the server & browser to control them.

In this case, the first time the browser sees the code trying to make a `GET` across origins (yes, `localhost:8000` & `localhost:5173` are considered different origins!), the brower does a **special** extra preflight check! This is where the `OPTIONS` request comes from.

If the server, seeing this `OPTIONS` request, doesn't respond with a certain response, the browser _ASSUMES_ that `CORS` requests aren't allowed, and all future `GET` attempts to that origin server will basically silent fail!

### The "How", or "How I Learned to Configure CORS, and LOVE the Fetch!"

Great. So how do we fix this?

You could write a view that responds to `OPTIONS` with the correct bits (`200 OK`, the `Access-Control-*` headers, & an empty body), but...

Fortunately, there's a third-party app called [django-cors-headers](https://pypi.org/project/django-cors-headers/), which (once configured) handles most everything for you.

```bash
# Install it!
$ pip install django-cors-headers
```

Then...

```python
# path/to/settings.py
INSTALLED_APPS = [
  # ...
  'corsheaders',
]

MIDDLEWARE = [
  # Somewhere before `CommonMiddleware`
  "corsheaders.middleware.CorsMiddleware",
]
```

However, there's two more bits of configuration that are needed:

```python
# Still in path/to/settings.py, probably towards the bottom.

# First, you need one (of the three) settings for controling what origins are
# allowed.
# I like having an explicit list, so I add **ALL** the domains I'll accept CORS
# requests from.
CORS_ALLOWED_ORIGINS = [
  'http://localhost:8000',
  'http://localhost:5173',
]

# Second, _if_ you're also sending credentials (like relying on the user being
# logged-in via Django), you'll need to explicitly enable including the
# credentials in the request!
# Without this, you might see `CORS Missing Allow Credentials` from the initial
# request!
CORS_ALLOW_CREDENTIALS = True

# And optionally, you can limit what paths can accept CORS requests. Like
# limiting it to your API endpoints.
CORS_URLS_REGEX = r"^/api/.*$"
```

Now back in the browser, refreshing, and **Huge Success!** No JS changes are needed, the `fetch(...)` is working, & we're getting results back from the API.

### Conclusion

Django & your browser take security pretty seriously, and while there's a lot of jargon & potentially-foreign-concepts to understand, it's worth it to keep your users safe. Thanks to nice/convenient tools across the board, it's not hard to deal with these limitations the right way.

And here are some great resources that go into more/better detail:

* https://javascript.info/fetch-crossorigin
* https://docs.djangoproject.com/en/5.1/ref/middleware/#module-django.middleware.security

<br>
<hr>
<br>

### Bonus: CSRF

...

_**HAHAHA! YOU FOOL! YOU THOUGHT YOU WERE SAFE & FINISHED, WITH NETWORK REQUESTS THAT WORKED! BUT MY VILLIAN ARC ISN'T OVER YET!**_

...because then you tried to make a `POST` (or a `PUT`/`DELETE`/`PATCH`) request. And Django blew up with a `405` error, and debugging it complains of a CSRF failure.

Luckily, this isn't so bad to deal with. Django is already giving you the CSRF token (via browser cookies), so with a little config & code changes, we'll get that sorted.

On the Django side, all that's needed is a settings change:

```python
# Still in path/to/settings.py

# Again, towards the bottom (& maybe gated on `DEBUG`, or populated by `ENV`
# vars)...
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:8000",
    "http://localhost:5173",
]
```

Look familiar? It's the same origins we just enabled for `CORS`, but this time we're allowing them for `CSRF` as well.

Then, in Javascript Land™, we'll need to install a package (to make accessing the cookies easier, though it's possible without), and slightly change up `apiRequest`:

```bash
$ npm i js-cookie
```

Then in our `apiRequest` code:

```js
// First, we add this import of `Cookies` for easy access.
import Cookies from 'js-cookie';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export async function apiRequest(url, method = 'get', data = null, headers = null) {
  let reqHeaders = { ...defaultHeaders };

  if (headers !== null) {
    reqHeaders = { ...headers };
  }

  const reqOpts = {
    method: method.toUpperCase(),
    credentials: 'include',
    headers: reqHeaders,
  };

  // Second, we detect if we're making a non-read-only (`GET`/`OPTIONS`/`TRACE`)
  // request.
  //
  // If so, we need to add the Django-specific `X-CSRFToken` header, populated
  // with the right token.
  //
  // There are lots of different ways this could be written. This is one of
  // them.
  //
  // Lastly, note that this header can be renamed via the `CSRF_HEADER_NAME`
  // setting! So if this fails, check your settings!
  switch (reqOpts.method) {
    case 'POST':
    case 'PUT':
    case 'DELETE':
    case 'PATCH':
      reqOpts.headers["X-CSRFTOKEN"] = Cookies.get("X-CSRFTOKEN");
      break;
  }

  if (data !== null) {
    reqOpts.body = JSON.stringify(data);
  }

  const resp = await fetch(url, reqOpts);

  if (!resp.ok) {
    throw new Error('Request failed')
  }

  return resp;
}
```

Once these changes are in-place, & all the code is reloaded, your requests from the browser should now be working once again!
