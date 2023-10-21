---
title: 'Primer for Switching Shells in 2021'
date: '2021-12-04'
time: '01:16:54'
author: 'Daniel'
slug: 'primer-switching-shells-2021'
---

_**Note:** This post has been sitting on the shelf for over 1.5 years, since early 2020. Some things are a bit less new than when written, but everything should still be fairly relevant. Enjoy!_

## Why

`bash` is the old stand-by, is available almost everywhere & is widely supported. But it also has a lot of drawbacks: esoteric configuration, scripting is uniquely awful, garbage multi-shell history, a less than perfect autocomplete, etc.

This is a guide on the whys & hows of switching your shell.

## Modern Options

* zsh (http://zsh.sourceforge.net/)
* fish (https://fishshell.com/)
* elvish (https://elv.sh/)
* nushell (https://github.com/nushell/nushell)

### Zsh

**Pros:**

* Commonly pre-installed on many systems
* The new default shell in macOS Catalina
* Big community, partly thanks to oh-my-zsh
* Better history than bash
* Better autocomplete than bash
* Improved prompt & color configuration over bash
* Slightly nicer configuration than bash
* Mostly bash-compatible

**Cons:**

* Still pretty esoteric, thanks to that bash-compatibility
* The docs are... not great
* Lots of tutorials & things are specific to oh-my-zsh

### Fish

**Pros:**

* Easy to install
* Everything, including the keywords, is a function
* Nice configuration/loading
* Great autocomplete
* Great multi-terminal history
* Great color support
* Great prompt support
* Nicer scripting than bash
* Optional web-based configuration
* Good documentation

**Cons:**

* Not bash-compatible, though frequently supported otherwise

### Elvish

**Pros:**

* Easy to install
* Neat data pipelines
* C-like scripting
* Great autocomplete
* Great history

**Cons:**

* The documentation is kinda all over the place/spotty
* Not bash-compatible
* Smaller community, so you're a bit more on-your-own

### Nushell

**Pros:**

* Easy to install
* Everything is data, including richer structured data
* Excellent Windows/Linux/macOS support
* Optional tabular output
* Neat prompt configuration
* Good documentation

**Cons:**

* While some things are very familiar, others feel foreign
* Not bash-compatible
* Alpha/beta-level implementation, but steady progress
* Small community due to newness

## How To Transition

For the remainder of this guide, I'll be assuming macOS as the operating system, as it's the one I'm most familiar with. This isn't particularly important in itself; just that if you're on a different OS, install procedures may differ.

More importantly is your terminal emulator. I use [iTerm](https://iterm2.com/) as my main terminal, but `Terminal.app` can do similar things with some coaxing. What you'll want to look for in your terminal emulator is the concept of **Profiles**.

Profiles allow you to setup different commands/configurations based on your selection. By using this & simply switching the shell (or command) executed,
we can leave our existing `bash`-based configuration alone as our default while
experimenting with other shells until we're comfortable.

Since all of the shells discussed in this guide use different configuration files, we can let all of these shells exist in parallel until the decision to jump to one is made!

> Note: For simplicity, the rest of this guide will focus on Zsh & Fish. Elvish & Nu are interesting to play with, but don't feel quite as complete for day-to-day use to the author. And the notes/approach below work just as well for them if you want to try them (& you should!).

## Installation

Since we're on macOS, you really ought to be using [Homebrew](https://brew.sh/). It's not that there aren't other ways to install the shells, but Homebrew is almost certainly the easiest. Assuming you have Homebrew setup & working...

Installing Zsh is actually a no-op. It's been there all this time, since at least as far back as OS X 10.3 Panther. _Yes, it's really been there the whole time._ You're probably best off using the system Zsh (`/bin/zsh`), but it is possible to install it via Homebrew & get a more bleeding-edge variant.

Installing Fish is only lightly more involved:

    # Install it from Homebrew.
    $ brew install fish
    # Add it to the shells available system-wide (optional, but suggested)
    $ echo /usr/local/bin/fish | sudo tee -a /etc/shells


## Basic Zsh Configuration

Zsh allows us to move from (commonly) just a single `.bash_profile`/`.bashrc` file to a more structured, multi-file configuration.

The first thing to do is go to your home directory & create the following files/structure:

    $ cd ~
    $ touch .zshenv
    $ mkdir .zsh-configs
    $ touch .zsh-configs/.zshrc

The `.zshenv` will be very simple, just a single line:

    ZDOTDIR="${HOME}/.zsh-configs"

This tells `zsh`, when starting, where to look for the other configuration files.

Within `.zsh-configs/.zshrc`, we'll add the following basic configuration:

    # Include the custom prompts.
    fpath=("$HOME/.zsh-configs/.zprompts" "$fpath[@]")

    autoload -Uz colors compinit promptinit
    colors
    compinit
    promptinit

    # Make sure the prompts will take subsitutions.
    setopt prompt_subst

    # Add menu-select style completions
    zstyle ':completion:*' menu select
    # Try to add completions for aliases.
    setopt COMPLETE_ALIASES
    # Allow `sudo ...` to try to provide completions as well.
    zstyle ':completion::complete:*' gain-privileges 1

    # Enable incremental history.
    HISTSIZE=10000
    SAVEHIST=10000
    HISTFILE=~/.zsh-configs/.zsh_history
    bindkey -v
    bindkey '^R' history-incremental-search-backward

We add in the option for custom prompts (within `~/.zsh-configs/.zprompts`),
a couple nice/basic plugins (`colors`, `compinit` & `promptinit`), set a
couple of style options & configure our history.

These put you in a "similar-but-better-than-bash" position. It even comes with an (optional) version control plugin, which lets you add things like Git branch to your prompt. For that, search the web for `vcs_info` plugin. For example, adding the following to your `~/.zsh-configs/.zshrc` gives you a variant of my prompt:

    autoload -Uz vcs_info
    precmd_functions+=( vcs_info )
    RPROMPT=\$vcs_info_msg_0_
    zstyle ':vcs_info:git:*' formats '%b'

You can find many more variations in the [zsh-users](https://github.com/zsh-users/zsh/blob/master/Misc/vcs_info-examples) repository, though beware that they can be a bit cryptic & take some experimentation.

If you have existing `bash` scripts or `alias`es, most will work with little to no changes. The Zsh docs explain this in a bit [greater detail](http://zsh.sourceforge.net/FAQ/zshfaq02.html).

## Basic Fish Configuration

> Note: One of the neatest things about Fish is the optional web-based configuration. You can just run `fish_config` & change/edit/add virtually everything I cover below, all from the comfort of your browser.

Fish also has a structured, multi-file configuration setup.

The first thing to do is go to your home directory & create the following files/structure:

    $ cd ~
    $ mkdir -p .config/fish/functions
    $ touch .config/fish/config.fish
    $ touch .config/fish/functions/fish_prompt.fish
    $ touch .config/fish/functions/fish_right_prompt.fish

The `.config/fish/config.fish` can be used akin to a `.bash_profile/.bashrc` if needed, though I prefer to keep it simple:

    # So ssh-agent behaves itself.
    ssh-add ~/.ssh/id_rsa
    
    # Bump dat ulimit.
    ulimit -n 4096

    # Ensure pyenv is working.
    pyenv init - | source

You can optionally add environment variable definition to that file, but even nicer is the ability to just set variables once & have them be remembered/shared with existing shells!

    # The `-x` says to set an environment variable (which is separate & scoped differently than a script variable).
    # The `-U` says to make it universal, saving it between sessions & even updating other existing `fish` shells!
    $ set -x -U PATH "/Users/daniel/bin" "/usr/local/bin" $PATH

Once you've run this once, it never needs to be set again (unless it changes, of course).

Things that would've been `alias`es under `bash` are instead functions. For instance, if we wanted a custom prompt, instead of using the `PS1` variable & some strange escape codes, we simply define a function:

    # ~/.config/fish/functions/fish_prompt.fish
    function fish_prompt
        # Grab & name some variables for ease of use.
        # The parens `(...)` run & capture output from other commands.
        set user (whoami)
        set full_host (string split -n -m 1 "." (hostname))
        set small_host $full_host[1]
        set current_dir (basename (pwd))

        # Changing colors is extremely nice. RGB hex colors (for instance, `0000FF` work as well).
        set_color blue
        # Just echo what you want in the prompt.
        # The `-n` here suppresses adding a newline.
        echo -n "["
        set_color normal
        echo -n "$user:$small_host:"
        set_color green
        echo -n "$current_dir"
        set_color blue
        echo -n "]"
        # Then set the color back to normal & finish the prompt.
        set_color normal
        echo -n ": "
    end

With this, you get a colorized prompt like `[daniel@Neptune:Code]: `.

You can make other alias/functions, such as:

    # .config/fish/functions/git-master.fish
    function git-master
        # To pull from the origin & hard-reset to what's there.
        git stash && git fetch && git reset --hard origin/master && git stash pop
    end

These functions are automatically picked up by Fish immediately. No reloading or starting another shell needed.

And adding a right-side Git prompt is just as easy. The following gives me a right-side prompt of the branch name when I'm in directories under version control with Git:

    # ~/.config/fish/functions/fish_right_prompt.fish
    function fish_right_prompt
        set git_branch (git rev-parse --abbrev-ref HEAD 2> /dev/null)

        if test -z "$git_branch"
            echo ""
            return
        end

        # Adding different colorization can be done by checking `git status -s`
        # and using conditionals.
        set_color -o green
        echo "$git_branch"
        set_color normal
    end

The [documentation](https://fishshell.com/docs/current/index.html) gives a ton more information on what's available & can be done.

## The Old Switcheroo

Now that we have our shells installed & configured, it's time to get back to those terminal profiles. Assuming iTerm, you can go to `iTerm > Preferences > Profiles`. We'll leave the `* Default` profile alone for now, which will preserve our `bash`-based setup.

In the left column, hit the `+` below the profile list to add a new one.

I created two additional profiles, `Test Zsh` & `Test Fish`. Within each, under the `General` tab, there's the `Command` section. You can change the dropdown from `Login Shell` to `Command`, then enter `/bin/zsh` (& `/usr/local/bin/fish` respectively).

Once this is done, you can close out of the Preferences. Up in the menu bar, iTerm has a `Profile` menu. Your new profiles are there & clicking one of the new options spawns a new terminal/tab with your newly configured shell in it.

This lets you experiment with the shell alternative while preserving your `bash`-based setups for emergencies until you're ready to complete the jump.

## Making The Transition

When you've done all the configuration & learning, and are ready to commit to a change, simply run one of the following:

    # For Zsh...
    $ chsh -s /bin/zsh

    # For Fish...
    $ chsh -s /usr/local/bin/fish

The next time you start up a default shell, it'll be your new selection. And you can keep `bash` (& its configs) around, if there's ever an emergency or stumbling block you can't overcome.

## Compatibility

For Zsh, there's not much to talk about here. Many `bash`-based scripts can be written to support Zsh's differences as well, or run unchanged if they're not complicated.

For Fish, it's a bit different. Because the scripting isn't `bash`-compatible, you may have to find alternatives (or worst case, reimplement). That said, many tools already come with support:

* Fish can natively provide completions for many tools with subcommands, like `git` & `brew`
* `pipenv` supports Fish natively
* `virtualenv` supports Fish natively, though your activation will need to become `. env/bin/activate.fish` (instead of `. env/bin/activate`)
