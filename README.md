# `nutoastdriven`

My personal site, rewritten using [Next.js](https://nextjs.org/).

Of most interest, this uses the new-style [Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing), as opposed to the older "Pages Router" that the tutorial uses.

This code is run locally & used to statically generate [Toast Driven](https://toastdriven.com/). This is likely only mostly useful to me, but feel free to refer to it and/or use code from it.


## Setup

Gotta have Node installed locally (`20.6.1`, installed via `asdf`). You'll also want [Just](https://just.systems/).

```bash
$ npm i
$ cp -i .env.example .env
```


## Creating Posts

Create the correct subdirectories in `posts/` for year/month/day, then create the post itself using Markdown.

A template:

```markdown
---
title: 'The Title Goes Here'
date: 'YYYY-MM-DD'
time: 'HH:MM:SS'
author: 'Daniel'
slug: 'the-slug-goes-here'
---

The post itself goes here...
```

Then you can generate & upload in a single go with `$ just refresh`.


## Running the Dev Site

```bash
$ npm run dev
```

Then hit [http://localhost:3000](http://localhost:3000) in your browser.


## Only Generating the Site

```bash
$ just build
```


## Only Uploading the Generated Site

```bash
$ just upload
```
