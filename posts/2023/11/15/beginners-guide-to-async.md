---
title: "Beginner's Guide To Async"
date: '2023-11-15'
time: '21:57:26'
author: 'Daniel'
slug: 'beginners-guide-to-async'
---

The world of concurrent/asynchronous programming can be daunting, especially new developers, or those used to traditional synchronous programming. This post is going to try to act as a guide for getting started on that journey.

We'll cover:

* What Is Concurrency?
* Why Should You Use Concurrency?
* A Sample of Concurrency Approaches
* When Should You Use Concurrency?
* Under the Hood: The Event Loop
* Asynchronous Python Options
* I/O Will Haunt You! 👻


## What Is Concurrency?

Let's start with a couple simple definitions, so we're all on the same page.

**Concurrency** is the act of the computer(s) handling multiple programming tasks in flight at once, with the tasks starting/overlapping/ending at any time. These may _interrupt_ each other, or take breaks to allow other tasks to process.

In (slight) contrast, **Parallelism** is the act of the computer handling multiple programming tasks at once, without interruption. These typically start at the same time & fan out.

> **Note:** It's understandable if this initially seems like a slim difference between concurrency & parallelism. They are closely related, but their actual performance can vary widely.
>
> They both might be able to handle dozens or hundreds of tasks at the same time, but parallelism (generally) has a much more consistent runtime (tasks divided by number of workers). Whereas concurrency can handle far more tasks at once, but each additional task may cause the others to be performed slower.
>
> These are not hard-and-fast rules, but a general way to think about the difference.

And last, but not least, **Synchronous** models only allows a _single_ task to process to completion at a given time.


## Why Should You Use Concurrency?

In a synchronous model, your code executes in order, start-to-finish. While this is the quickest of the approaches to complete (in terms of raw instructions per second), any time there's I/O (e.g. waiting on disk access, network traffic, etc.), it will sit idle until it receives the data it needs to continue processing.

Concurrency enables being able to handle many requests/tasks at the same time, which lets you make better use of your computing resources. Instead of just sitting idle & waiting on I/O (or other slow operations), the computer can accept & process other tasks while waiting.


## A Sample of Concurrency Approaches

In general (especially in the world of [Python](https://python.org/)), there are four approaches to concurrency that I'll introduce:

* Greenlets / Event Loops
* Processes
* Threading
* Task Queues

### Greenlets / Event Loops





## When Should You Use Asynchronous Programming?

Concurrency is great


## Under the Hood: The Event Loop
## Asynchronous Python Options
  * Asyncio
  * Gevent
  * Twisted
  * Multiprocessing
  * Threading
## I/O Will Haunt You! :ghost:
