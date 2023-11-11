---
title: 'Falling In Love with Preact'
date: '2023-11-10'
time: '20:01:53'
author: 'Daniel'
slug: 'falling-in-love-with-preact'
---

Over the last couple years, I had a couple roles that gave me a chance to stretch my frontend legs a little more. I've spent a bunch of time working with [React](https://react.dev/), as well as [OpenLayers](https://openlayers.org/), [Next.js](https://nextjs.org/), a bit of [htmx](https://htmx.org/), and others.

But, as the title alludes to, I want to talk about a library I haven't seen many talk about: [Preact](https://preactjs.com/).

## What is Preact?

Preact is a Javascript library that allows you to easily build a component-based UI. If you've ever worked with any React, [Vue.js](https://vuejs.org/), or similar, the terminology/feature-set/architecture will be very familiar.

For example, a simple `Avatar` component (with a bit of [Tailwind](https://tailwindcss.com/) & the built-in JSX support) might look like:

```
function Avatar({ name, imageUrl, size = 12, ...props }) {
  return (
    <img
      src={imageUrl || 'https://cdn.com/our-site/generic-avatar.png'}
      alt={name}
      class={`inline-block m-4 rounded-full w-${size} h-${size}`}
    />
  );
}
```

## Why Preact?

The biggest common selling point is that it's a (very) lightweight alternative to React, weighing in at just 3Kb when minified. Despite the size difference, from a general usage standpoint, it achieves this without any major sacrifices.

It also has an extensive `preact/compat` library, which strives for excellent React compatibility out-of-the-box, meaning relatively painless migrations from React to Preact.

But for me, there are two bigger reasons to love Preact:

1. [HTM](https://github.com/developit/htm) support
2. A great "small" usage story

## 1. HTM?

For a long time after initially using React (circa 2017), I was turned off by [JSX](https://react.dev/learn/writing-markup-with-jsx). I was a big believer in [Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement), and JSX felt awful from this standpoint.

The mix of code & logic, the effort that used to be required to do the right transforms. The docs, even today, aren't particularly complete or helpful, with lots of surprising gotchas (`className`, wrapping with the `<>` fragment, naming of the event handlers, etc.).

Over time recently, I've gradually acclimated to JSX's... eccentricities, and accepted that Progressive Enhancement has gradually gone the way of the dodo.

However, [HTM](https://github.com/developit/htm) is a lovely alternative to JSX. It looks & feels closer to something like [mustache](https://mustache.github.io/), is built off standard Tagged Templates, and doesn't require a transpiler to function!

> Note: Yes, I know you don't **have** to use JSX with React, or that you can use HTM **with** React. But as opposed to those options, the Preact+HTM path is well-documented & well-tread.

For example, to revisit the earlier `Avatar` example:

```
// Import it, just like anything else!
import { html } from 'htm';

function Avatar({ name, imageUrl, size = 12, ...props }) {
  // And call it, rather than returning JSX.
  return html`
    <img
      src=${imageUrl || 'https://cdn.com/our-site/generic-avatar.png'}
      alt=${name}
      class="inline-block m-4 rounded-full w-${size} h-${size}"
    />
  `;
}
```

It feels much closer to regular HTML, and like Preact, is very lightweight. This makes it perfect for tiny projects, which leads me to...

## 2. A great "small" usage story

Let's say you wanted to just integrate a single component or two on a small static website. How do you go about doing that with React?

Most of the React docs assume you're building a significant SPA, and significant local setup to build. Even the tutorial has you downloading Node, installing dependencies, and a non-trivial build process.

While that may be second-nature to many/most Javascript enthusiasts, there are lots of regular backend developers or designers who only occasionally help with some code to whom this is a daunting task. Even once things are setup, it's easy for build or dependency issues to creep in over time.

> Note: Again, I know it's possible to do ultra-light React installs without all this. But it's not well-documented nor particularly easy to suss out.

In contrast, here's a way we could use that `Avatar` with Preact at the smallest scale:

```
<!doctype html>
<html>
  <head>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>

  <body class="p-32">
    <header class="flex flex-row">
      <h1 class="text-7xl font-bold">
        Hi, I'm Daniel
      </h1>
      <!-- 1. Give it an element to render into. -->
      <div id="my-avatar"></div>
    </header>

    <!-- 2. Add in a script tag, using ESM modules. -->
    <script type="module">
      import { html, render } from 'https://esm.sh/htm/preact/standalone';

      // 2a. For nice readability, make a variable for my avatar image URL.
      const myAvatar = 'https://avatars.githubusercontent.com/u/2449?v=4';

      // This is unchanged from above.
      function Avatar({ name, imageUrl, size = 12, ...props }) {
        return html`
          <img
            src=${imageUrl || 'https://cdn.com/our-site/generic-avatar.png'}
            alt=${name}
            class="inline-block m-4 rounded-full w-${size} h-${size}"
          />
        `;
      };

      // 3. Render it to the element!
      render(
        html`<${Avatar} name="Daniel" imageUrl=${myAvatar} />`,
        document.getElementById('my-avatar')
      );
    </script>
  </body>
</html>
```

That's it! A full, working page utilizing a one-off component with minimal effort, & no build required!

And because it's just a single import and a single `render` function call, this is exceedingly friendly to people who are much less familiar with modern Javascript environments.

Of course, it has a great full-SPA story as well, with routing, debugging, testing, and [Typescript](https://www.typescriptlang.org/) support. Not to mention being able to basically use thousands of React components right off-the-shelf.

## Conclusion

I'm old enough now, & experienced enough as an open-source author, that I think virtrol towards any software is pointless & detrimental. I'm not calling out React, nor saying _"it's bad lol"_. I'm almost certainly going to use React & other libraries more in the future, without public complaint/hate.

But variety is the spice of life, and I'd rather spend my time singing the praises of things I like. And I really like Preact, having built a couple smaller projects with it.

My take is that I'd encourage you to give it a try. You can literally start from a single `.html` file in an editor (feel free to use the above as a starting point), which is fantastic for experimentation.

Happy Javascript-ing!
