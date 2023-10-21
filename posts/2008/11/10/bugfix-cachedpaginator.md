---
title: 'Bugfix to CachedPaginator'
date: '2008-11-10'
time: '11:20:00'
author: 'Daniel'
slug: 'bugfix-cachedpaginator'
---

<p>Found by <a href="http://www.b-list.org/">Mr. Bennett</a>, there was a bug in the <a href="http://toastdriven.com/fresh/cachedpaginator">CachedPaginator</a>. Newly added is a <code>number = self.validate_number(number)</code> call in the <code>page</code> method. You'll want to grab the latest source from <a href="http://www.djangosnippets.org/snippets/1173/">http://www.djangosnippets.org/snippets/1173/</a> if you used it.</p>