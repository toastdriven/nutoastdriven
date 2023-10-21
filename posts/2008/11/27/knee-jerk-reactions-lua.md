---
title: 'Knee Jerk Reactions To Lua'
date: '2008-11-27'
time: '00:48:07'
author: 'Daniel'
slug: 'knee-jerk-reactions-lua'
---

<p>So I've been playing with <a href="http://www.lua.org/">Lua</a> for what amounts to 2 cumulative hours now. More specifically, I've been working my way through <a href="http://www.lua.org/pil/index.html">Programming In Lua</a> and thought I'd post some of my more immediate reactions to it.</p>

<h3>What I Like</h3>

<ul>
    <li>Compiled from source, a piece of cake and tiny too.</li>
    <li>Compact syntax</li>
    <li>Yay, no curlies everywhere!</li>
    <li>Man, this is pretty fast.</li>
    <li>Knowing Python and Ruby, this is pretty easy to get into. It seems to strike a balance between the two syntaxes.</li>
    <li>Holy crap, this is really fast!</li>
    <li>Yay, first class functions!</li>
    <li>Tables everywhere. Interesting...</li>
    <li><code>do ... end</code> looks like an anonymous block to me. Where can I all use that syntax?</li>
    <li>Yay! <code>elseif</code>, not <code>elif</code> or <code>elsif</code>! Thank you for a touch of sanity.</li>
</ul>

<h3>What I Don't Like</h3>

<ul>
    <li>I understand that packages can be created with tables and simulate OO, but I really kinda want a slight more traditional OO implementation. Maybe it will grow on me.</li>
    <li>The <a href="http://www.lua.org/pil/index.html">PIL</a> could really use a better quick start, or a companion book targeted toward developers already familiar with similar languages.</li>
    <li>Not sure I like the assumed global variable names unless specified <code>local</code>. I'd rather it were the other way (everything is local unless you say <code>global</code>).</li>
    <li>I kinda want to sink my teeth into something that actually does something, as opposed to itty-bitty toy programs that demonstrate a single feature. This is great for someone new to this but I feel like I'm ready for more.</li>
    <li>The comment syntax, especially the block comment, makes me want to gag.</li>
    <li>Lua's builtin <code>math.random</code> sucks. Absolutely terrible.</li>
</ul>

<p>Overall, my experience is favorable enough that I'll try to write a couple more programs in Lua to get a better feel for it. I love how fast it is, even on trivial stuff. Maybe I'm just imagining but it feels palpable to me.</p>

<p>Anyway, I'm posting my first real Lua snippet. Nothing impressive ("Guess My Number" is my "Hello World") but tests a bunch of aspects of the language in practice.</p>

<pre><code class="prettyprint">#!/usr/bin/env lua
require("math")
require("os")

minimum_number = 1
maximum_number = 100
total_guesses = 10

math.randomseed(os.time())
-- Throwaway to start producing random numbers.
math.random(minimum_number, maximum_number)

function check_guess(correct_number, guessed_number)
    if guessed_number > correct_number then
        return "Too high!"
    elseif guessed_number < correct_number then
        return "Too low!"
    else
        return "Correct!"
    end
end

function main()
    local correct_number = math.random(minimum_number, maximum_number)
    local guess_count = 1
    local guessed_correctly = false
    
    print("Guess My Number (" .. minimum_number .. " to " .. maximum_number .. ").")
    
    while guess_count <= total_guesses do
        print("Enter a guess:")
        local guess_number = io.read("*number")
        local response = check_guess(correct_number, guess_number)
        print(response)
        
        if response == "Correct!" then
            guessed_correctly = true
            break
        end
        
        guess_count = guess_count + 1
    end
    
    if guessed_correctly == true then
        print("You guessed right! The correct number was " .. correct_number .. ".")
        print("You took " .. guess_count .. " guesses.")
    else
        print("Sorry! The correct number was " .. correct_number .. ".")
    end
end

-- Run!
main()
</code></pre>