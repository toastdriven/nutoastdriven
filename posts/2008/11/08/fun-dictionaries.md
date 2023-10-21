---
title: 'Fun With Dictionaries'
date: '2008-11-08'
time: '22:27:50'
author: 'Daniel'
slug: 'fun-dictionaries'
---

<p>Another brief entry, this time about a fun little <a href="http://www.python.org/">Python</a> trick. One of the fun things about Python is the fact that functions are first class objects. Which means that, in general, any where you could assign something to another common object (like a string or a number), you could assign a function.</p>

<p>With that in mind, this is a neat way to reorganize a large <code>if/elif</code> with relatively simple tests. We'll start with:</p>

<pre><code class="prettyprint">class PlayerPosition(object):
    def go_north(self): print 'Went N' # Stubbed for now
    def go_south(self): print 'Went S' # Stubbed for now
    def go_east(self): print 'Went E' # Stubbed for now
    def go_west(self): print 'Went W' # Stubbed for now
    
    def go(self, direction="N"):
        if not isinstance(direction, basestring):
            raise AttributeError('Direction should be a string.')
        
        direction = direction.upper()
        
        if direction not in ('N', 'S', 'E', 'W'):
            raise AttributeError('Direction should be either N, S, E, or W.')
        
        if direction == 'N':
            self.go_north()
        elif direction == 'S':
            self.go_south()
        elif direction == 'E':
            self.go_east()
        elif direction == 'W':
            self.go_west()
        else:
            raise RuntimeError("How'd we get here?")
</code></pre>

<p>A bit contrived perhaps but bear with me. The pain of this comes from adding new cases (like supporting non-cardinal directions like "SW"). Not only do you have to add another <code>elif</code>, but you also need to update your <code>if</code> check for valid directions and update your exception that indicates valid directions. Guaranteed that someday something will get forgotten/missed.</p>

<p>Since we're using a simple string test and only calling one function for each case, we can use a dictionary to reorganize and simply this code:</p>

<pre><code class="prettyprint">class PlayerPosition(object):
    def go_north(self): print 'Went N' # Stubbed for now
    def go_south(self): print 'Went S' # Stubbed for now
    def go_east(self): print 'Went E' # Stubbed for now
    def go_west(self): print 'Went W' # Stubbed for now
    
    def go(self, direction="N"):
        if not isinstance(direction, basestring):
            raise AttributeError('Direction should be a string.')
        
        direction = direction.upper()
        
        direction_mapping = {
            'N': self.go_north,
            'S': self.go_south,
            'E': self.go_east,
            'W': self.go_west,
        }
        
        if direction not in direction_mapping:
            raise AttributeError('Direction should be %s.' % ', '.join(direction_mapping.keys()))
        
        direction_mapping[direction]()
</code></pre>

<p>While only slightly shorter, we've made it super-easy to add new cases and reduced the number of things we'd have to update should a new case be added. The only thing we need to do is add the new direction and method to the <code>direction_mapping</code> dictionary and we're done.</p>

<p>There's plenty of ways to use this, but some applications for this technique I've used in the past include simple state machines, parsing strings, customizable mappings for developers using the library you're creating, etc. Even better, this same technique works for other languages, such as <a href="http://www.ruby-lang.org/en/">Ruby</a> and <a href="http://en.wikipedia.org/wiki/JavaScript">Javascript</a>. Hopefully, a fun little addition to your toolset.</p>