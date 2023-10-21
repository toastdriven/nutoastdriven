---
title: 'Using Solr Multicore'
date: '2009-01-28'
time: '21:38:40'
author: 'Daniel'
slug: 'solr-multicore'
---

<p>At work, <a href="http://lucene.apache.org/solr/">Solr</a> is the search backend of choice. In the process of upgrading to Solr 1.3.0, a cursory search for "solr multicore" yielded very little in the way of how to go about setting it up. Solr's multicore functionality is a way to run one Solr daemon that can serve multiple instances, meaning you run one Solr process but it can index/search completely different sites.</p>

<p>So without further ado, here's a quick way to get multicore support up and going for Solr 1.3.0:</p>

<ol>
    <li>Fetch the latest release from the <a href="http://lucene.apache.org/solr/">Solr website</a>.</li>
    <li>Extract the tarball in a temporary location.</li>
    <li>Copy the "example" directory out to where you'd like to keep Solr and rename it "solr-1.3.0".</li>
    <li>
        Remove the following directories:
        <ul>
            <li>solr-1.3.0/example-DIH</li>
            <li>solr-1.3.0/exampleAnalysis</li>
            <li>solr-1.3.0/exampledocs</li>
            <li>solr-1.3.0/work</li>
        </ul>
    </li>
    <li>Copy "solr-1.3.0/multicore/solr.xml" to "solr-1.3.0/solr/solr.xml".</li>
    <li>Remove the "solr-1.3.0/multicore" directory.</li>
    <li>Within the "solr-1.3.0/solr/"directory, you should create a directory for each core (instance) you'd like to serve, then populate that directory with a "conf" directory. A quick route here is to copy the "solr-1.3.0/solr/conf" directory into your new directory and customize it to your liking.</li>
    <li>Alter "solr-1.3.0/solr/solr.xml" to include the newly added cores.</li>
    <li>Run Solr via "java -jar start.jar".</li>
</ol>

<p>This was enough to get development machine up and running. We've done some performance tuning beyond this to take advantage of server hardware and large document sets, but those are better documented.</p>