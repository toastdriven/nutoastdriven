---
title: 'Turtle!'
date: '2008-11-04'
time: '23:37:33'
author: 'Daniel'
slug: 'turtle'
---

<p>I'm going to diverge from <a href="http://www.djangoproject.com/">Django</a> topics tonight and instead cover my favorite <a href="http://www.python.org/">Python</a> module. It's not my favorite due to heavy use, nor it's utility, nor widespread acclaim. It's my favorite because it makes me wax nostalgic for the very first bit of programming I ever did. The module is <code><a href="http://docs.python.org/library/turtle.html">turtle</a></code>, a pure Python <a href="http://en.wikipedia.org/wiki/Logo_(programming_language)">LOGO</a> implementation.</p>

<p>The history on this is that, as a young kid of maybe 5-6 years old, my parents enrolled me in a summer computing class. Most of the time was spent on doing some very basic desktop-publishing type things. But on the final day of the class, they introduced us to LOGO on our C64's. I was enthralled by being able to push the little turtle around the screen, making pictures as it went.</p>

<p>So we'll dive into a bit of <code>turtle</code>. The <code>turtle</code> module comes standard with Python 2.5+ (and may be present in older versions). The basic idea behind LOGO is that you programmatically move a turtle (the pen) around the screen, drawing as it goes. To play with, you can simply run everything from a basic Python shell (no script/file needed). All code here was written using Python 2.5 and may need adjustments for the new version in Python 2.6+. Let's dive in.</p>

<pre><code class="prettyprint">import turtle

t = turtle.Turtle()
</code></pre>

<p>Entering this will create a new <code>Turtle</code> instance, providing you with a new Tk window with a small arrowhead (the turtle) at the center.</p>

<h3>Basic Movement</h3>

<p>All movement is based of the turtle's last position and direction it was pointed, so you'll want to make sure to keep track of this as you go. The turtle really only understands forward/backward movement or turning (there is no "go left" capabilities). Forwards/backwards movement is done in pixel amounts, while turning is specified in degrees.</p>

<pre><code class="prettyprint">import turtle

t = turtle.Turtle()

t.forward(50)
t.left(90)
t.forward(50)
t.right(90)
t.forward(50)
t.right(135)
t.forward(71)
t.right(45)
t.forward(50)
t.left(180)
</code></pre>

<p>Running this should give you a line connecting to a right triangle and return the turtle to its original position/orientation on the screen. During all these movements, the turtle has been drawing continuously. But this may not be what you want if you want to draw more than one thing.</p>

<h3>Pen Control</h3>

<p>You have control over how the pen on the turtle draws as well. The turtle starts out drawing by default but you can lift the pen, which allows you to reposition the turtle without drawing. You can also the pen's thickness and color.</p>

<pre><code class="prettyprint">import turtle

t = turtle.Turtle()

# Basic Movement
t.forward(50)
t.left(90)
t.forward(50)
t.right(90)
t.forward(50)
t.right(135)
t.forward(71)
t.right(45)
t.forward(50)
t.left(180)

# Pen Control
t.up()
t.forward(100)
t.width(3)
t.color(1, 0, 0)
t.down()
t.forward(5)
t.left(90)
t.forward(5)
t.left(90)
t.forward(5)
t.left(90)
t.forward(5)
</code></pre>

<p>This will add a small, thick-lined square to your screen apart from the original drawing.</p>

<h3>More Advanced Usage</h3>

<p>The <code>turtle</code> can also draw more advanced things, like circles (or semicircles), filled shapes and even write text. For example:</p>

<pre><code class="prettyprint">import turtle

t = turtle.Turtle()

# Basic Movement
t.forward(50)
t.left(90)
t.forward(50)
t.right(90)
t.forward(50)
t.right(135)
t.forward(71)
t.right(45)
t.forward(50)
t.left(180)

# Pen Control
t.up()
t.forward(100)
t.width(3)
t.color(1, 0, 0)
t.down()
t.forward(5)
t.left(90)
t.forward(5)
t.left(90)
t.forward(5)
t.left(90)
t.forward(5)

# More Advanced Usage
t.up()
t.width(1)
t.color(0, 0, 0)
t.right(90)
t.forward(100)
t.right(90)
t.forward(200)
t.color(0, 1, 0)
t.down()
t.circle(20)
t.up()
t.right(90)
t.forward(30)

t.color(.8, .8, 1)
t.begin_fill()
t.down()
t.forward(20)
t.left(90)
t.forward(20)
t.left(90)
t.forward(20)
t.left(90)
t.forward(20)
t.end_fill()

t.up()
t.color(0, 0, 0)
t.forward(30)
t.down()
t.write("Thanks!")
</code></pre>

<p>This should be pretty easy to understand. The turtle moved up the screen, drew a green circle, moved to the right and drew a filled light blue box, then moved down and wrote out the text "Thanks!" to the screen.</p>

<p>The last leap I'm going to show you stems from the fact that all of this is simply Python code and, as such, any other Python code can be used in conjunction with it. A couple quick examples:</p>

<pre><code class="prettyprint">import turtle

t = turtle.Turtle()

t.color(0, .5, 0)
t.up()
t.forward(5)
t.down()
t.begin_fill()

for i in xrange(0, 4):
    t.forward(20)
    t.left(90)
    t.forward(5)
    t.right(90)
    t.forward(5)
    t.left(90)

t.end_fill()
</code></pre>

<p>...or...</p>

<pre><code class="prettyprint">import turtle

t = turtle.Turtle()

t.up()
t.backward(300)
t.down()

import datetime
t.write(datetime.datetime.now().isoformat())

t.up()
t.right(90)
t.forward(20)
t.left(90)
t.down()

import urllib
page = urllib.urlopen("http://toastdriven.com/acronyms/random/")
content = page.read()

replace_tags = {
    '&lt;dl&gt;': '',
    '&lt;/dl&gt;': '',
    '&lt;dt&gt;': '',
    '&lt;/dt&gt;': '',
    '&lt;dd&gt;': ' - ',
    '&lt;/dd&gt;': '',
}

for tag, replacement in replace_tags.items():
    content = content.replace(tag, replacement)

content = content.replace('\n', ' ').strip()
t.write(content[0:100])
</code></pre>

<h3>Why?</h3>

<p>Other than the nostalgia factor, I think that LOGO (via Python's <code>turtle</code> module) is a great way to introduce kids to computer programming. There's a very low barrier to entry (working Python), there's immediate feedback when they do something and progress can be made simply by tweaking things they've already run. Additionally, this can provide a great introduction to Python, to object-orientation (what does a turtle know about? what can a turtle do?) and eventually to refactoring (how to make the code shorter/more clear/more clever).</p>

<p>Obviously, there's a ton I haven't covered about this module (and the new version in Python 2.6 adds even more functionality) so I definitely recommend hitting up the <a href="http://docs.python.org/library/turtle.html">documentation</a> once you've exhausted the code provided here.</p>