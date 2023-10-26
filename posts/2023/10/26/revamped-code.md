---
title: 'Revamped Code'
date: '2023-10-26'
time: '01:29:34'
author: 'Daniel'
slug: 'revamped-code'
---

I've spent a chunk of this last week doing something I've been putting off for years: rewritting the code that powers this site.

For years, [Toast Driven](https://toastdriven.com) has been (unsurprisingly) running as a small Django-based site. It's been through a handful of small revisions & tweaks over the years:

* removing tags/comments
* moving from raw HTML to Markdown-based posts,
* adding support for multiple authors when it was a business,
* etc.

All the while, it's been perilously running on a **very** old version of [Django](https://djangoproject.com/). Updating everything seemed like too much of a hassle, and I'd dread making new posts because it would always remind me of how out-of-date the site was. This has also made it required to have a full small server running, to support the database & dynamic generation.

**But No Longer!**

I've rewritten (& published the [source code](https://github.com/toastdriven/nutoastdriven)) the whole site. It's now build using [Next.js](https://nextjs.org/) & is a nicely static site.

### Why Write Another Blog?

For the longest time, I've recognized that backing the site with a database was overkill. In addition, what I really wanted was a version-controlled hierarchy of Markdown files for the posts to generate the site.

There are other options out there (such as [Jekyll](https://jekyllrb.com/) or [Hugo](https://gohugo.io/)). However, I don't really care for their templating/requirements.

Given that much of the last couple years has been spent creating [React](https://react.dev/) applications, I wanted to play with [Next.js](https://nextjs.org/).

### How Is It Not Just The Tutorial?

The existing Next.js [tutorial](https://nextjs.org/learn/basics/create-nextjs-app) is based on the older [Pages Router](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts).

This is fine, but I started from the recommended newer [App Router](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) when I started the repository & wanted to commit to learning the latest-and-greatest.

There aren't a lot of other references out there (that I found) on how to build with the App Router, so I open-sourced the code in case it's helpful to someone else.

### ~~The End?~~ NOT The End

I'm excited because this kills many of the reasons I haven't blogged in a long time, and it's a fun new stack to play with. Maybe I'll write up a "trials and tribulations" post about the process of creating the new code.

And while I've been doing this long enough to know these are likely Famous Last Words™, this should let me post more frequently in the future.
