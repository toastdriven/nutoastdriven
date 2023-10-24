'use client';
import { useState } from 'react';

export default function Page(props) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="container">
      <header className="vcard">
        <h1>
          Hi, I'm{' '}
          <div className="n">
            <div className="given-name">Daniel</div>
            <div className="family-name">Lindsley</div>
          </div>
        </h1>

        <div className="contact_info">
          <div className="adr">
            <div className="street-address">3536 Eagle Pass Ct.</div>
            <div>
              <span className="locality">Lawrence</span>,{' '}
              <span className="region">KS</span>{' '}
              <span className="postal-code">66049</span>
            </div>
          </div>
          <div className="email"><a href="mailto:daniel@toastdriven.com">daniel@toastdriven.com</a></div>
          <div className="tel">+1-785-840-5632</div>
          <div className="other_sites">
            On <a href="https://github.com/toastdriven">GitHub</a>
          </div>
        </div>
      </header>

      <section id="about">
        <h2><a name="about-link">About</a></h2>

        <p>
          I'm a developer specializing in web-based technologies. I'm a pretty
          full-stack kinda guy, comfy with everything from database schema
          design to broad system architecture to front-end HTML/CSS/Javascript
          work. I write well-tested code &amp; aim to constantly improve.
        </p>

        <p>
          Outside of work, I love working on open-source, playing
          video games, playing/composing music, reading, snowboarding,
          &amp; bicycling.
        </p>
      </section>

      <section id="skills">
        <h2><a name="skills-link">Skills</a></h2>

        <dl>
          <dt>Professional</dt>
          <dd>Python</dd>
          <dd>Django</dd>
          <dd>Javascript</dd>
          <dd>React</dd>
          <dd>HTML/CSS</dd>
          <dd>Docker</dd>
          <dd>PostgreSQL</dd>
          <dd>Cloud Infra (AWS/GCloud)</dd>
          <dd>Git</dd>
          <dd>Node.js</dd>
          <dd>PostGIS</dd>
          <dd>GDAL</dd>
          <dd>OpenLayers</dd>
          <dd>Redis</dd>
          <dd>Elasticsearch</dd>
          <dd>Solr</dd>
          <dd>nginx</dd>
          <dd>memcached</dd>
          <dd>Lua</dd>

          <dt>Older/Experimental</dt>
          <dd>Arduino</dd>
          <dd>Go</dd>
          <dd>Swift/Obj-C/Cocoa</dd>
          <dd>Apache</dd>
          <dd>MySQL</dd>
          <dd>Ruby</dd>
          <dd>PHP</dd>
          <dd>Varnish</dd>
          <dd>Mercurial</dd>
          <dd>Erlang</dd>
          <dd>Riak</dd>
          <dd>Typescript</dd>
        </dl>
      </section>

      <section id="experience">
        <h2><a name="experience-link">Experience</a></h2>

        <div className="thing_i_have_done_for_money">
          <h3><a href="https://pawlicy.com/">Pawlicy Advisor</a></h3>

          <div className="metadata">
            <span className="date_range">05/2023 - 09/2023</span>{' '}
            <span className="position">(Senior Software Engineer)</span>
          </div>

          <p>
            Addressed a chunk of technical debt & helped improve local
            development, including Docker & debugging improvements.
            Spec'd & built a revenue reconciliation system.
            Provided mentorship for others.
          </p>
        </div>

        <div className="thing_i_have_done_for_money">
          <h3><a href="https://revsys.com/">RevSys</a></h3>

          <div className="metadata">
            <span className="date_range">12/2021 - 05/2023</span>{' '}
            <span className="position">(Software Engineer)</span>
          </div>

          <p>
            Developed an API backend & React-based SPA frontend for
            a white-labeled small business application. Upgraded a
            learning platform's backend & frontend through several
            major framework versions.
          </p>
        </div>

        <div className="thing_i_have_done_for_money">
          <h3><a href="https://routable.com/">Routable</a></h3>

          <div className="metadata">
            <span className="date_range">06/2021 - 11/2021</span>{' '}
            <span className="position">(Principal Software Engineer)</span>
          </div>

          <p>
            Converted a large codebase to a container-based setup as
            part of improving CI/CD. Assisted in redesigning a large
            monolithic codebase into a service-based approach. Several
            internal technical planning documents for pending
            projects. Worked on improving a bulk import system.
          </p>
        </div>

        <div className="thing_i_have_done_for_money">
          <h3><a href="https://cornea.is/">Cornea</a></h3>

          <div className="metadata">
            <span className="date_range">02/2020 - 05/2021</span>{' '}
            <span className="position">(Software Engineer)</span>
          </div>

          <p>
            Built a web-based mapping tool & scientific platform to
            support wildfire firefighting. Implemented several
            scientific whitepapers from scratch to compute potential
            control locations & suppression difficulty index, as
            well as all the component calculations. Also involved a
            wide array of data ingest, and building out a full JS
            frontend to support it. Built out & automated full AWS
            infrastructure.
          </p>
        </div>

        <div className="thing_i_have_done_for_money">
          <h3><a href="https://britecore.com/">BriteCore</a></h3>

          <div className="metadata">
            <span className="date_range">01/2019 - 01/2020</span>{' '}
            <span className="position">(Software Engineer)</span>
          </div>

          <p>
            Rebuilt the development environment used by all Gen2
            developers, based on Docker & Compose. Rewrote the
            bootstrapping process for new environments, cutting new
            setup time from days down to 20 minutes. Provided user
            support & 8 releases for a community of ~150 developers.
            Ad-hoc managed a team of 4 for several months. Helped
            improve performance, security & test coverage.
          </p>
        </div>

        <div className="thing_i_have_done_for_money">
          <h3><a href="https://urbanairship.com/">Urban Airship</a></h3>

          <div className="metadata">
            <span className="date_range">03/2014 - 01/2019</span>{' '}
            <span className="position">(Senior Web Developer)</span>
          </div>

          <p>
            Worked on the{' '}
            <a href="https://go.urbanairship.com/">Urban Airship</a>{' '}
            user interface, including several major features around
            timezones, third-party integrations, data migrations and
            a team-based permission system. Performed many code
            reviews, established internal documentation/procedures
            &amp; spent quite a bit of time mentoring.
          </p>
        </div>

        <div className="thing_i_have_done_for_money">
          <h3><a href="http://aws.amazon.com/">Amazon Web Services</a></h3>

          <div className="metadata">
            <span className="date_range">03/2013 - 03/2014</span>{' '}
            <span className="position">(Python SDE II)</span>
          </div>

          <p>
            Worked on <a href="http://docs.pythonboto.org/">boto</a>,
            including adding a high-level interface for DynamoDB(2),
            approximately a dozen releases &amp; many service updates.
            Also developed the initial code for{' '}
            <a href="https://github.com/toastdriven/boto3">boto3</a>.
            Conducted a number of interviews, many code reviews &amp;
            time mentoring.
          </p>
        </div>

        <div id="more_experience_wrapper">
          <p>
            <a
              className="experience_toggle"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore
                ? "Less experience..."
                : "More experience..."
              }
            </a>
          </p>

          {showMore && (
            <div id="more_experience">
              <div className="thing_i_have_done_for_money">
                <h3><a href="http://toastdriven.com/">Toast Driven</a></h3>

                <div className="metadata">
                  <span className="date_range">05/2011 - 12/2012</span>{' '}
                  <span className="position">(Owner/Founder/Head Bit Herder)</span>
                </div>

                <p>
                  Ran my own Python/Django consultancy. Originally just me, we
                  had as many as three people. Helped many clients with
                  their RESTful APIs, integrating search as well as general
                  development.
                </p>
              </div>

              <div className="thing_i_have_done_for_money">
                <h3>Mediaphormedia</h3>

                <div className="metadata">
                  <span className="date_range">06/2008 - 04/2011</span>{' '}
                  <span className="position">(Senior Web Developer)</span>
                </div>

                <p>
                  Worked for the birthplace of Django developing Ellington, an
                  award-winning news CMS. Ported it to Django 1.0, vastly revised
                  the search functionality, added an API, worked on a Q&amp;A
                  app, lots of importers.
                </p>
              </div>

              <div className="thing_i_have_done_for_money">
                <h3>Forkinit</h3>

                <div className="metadata">
                  <span className="date_range">12/2009 - 02/2011</span>{' '}
                  <span className="position">(Co-founder)</span>
                </div>

                <p>
                  Developed a more modern recipe site. Took a structured approach,
                  parsing recipe bodies to extract data. Allowed for "forking"
                  a recipe (start with a base &amp; be able to make your changes).
                </p>
              </div>

              <div className="thing_i_have_done_for_money">
                <h3><a href="http://toastdriven.com/">Toast Driven (Round 1)</a></h3>

                <div className="metadata">
                  <span className="date_range">04/2008 - 05/2008</span>{' '}
                  <span className="position">Owner</span>
                </div>

                <p>
                  Run as a Ruby on Rails shop for short period of time.
                  Worked on a reporting site (using Flex, Actionscript &amp; Rails)
                  to produce nice charts/graphs for surveying software.
                </p>
              </div>

              <div className="thing_i_have_done_for_money">
                <h3><a href="http://liveoak360.com/">Live Oak</a></h3>

                <div className="metadata">
                  <span className="date_range">11/2005 - 04/2008</span>{' '}
                  <span className="position">Web Developer</span>
                </div>

                <p>
                  Did PHP/MySQL development for a variety of clients.
                  Tasks included developing on multi-lingual CMSes, several
                  e-commerce sites, hosting &amp; server administration,
                  &amp; the development of a PHP5 web framework called Acorn.
                  Also some Rails development for a client.
                </p>
              </div>

              <div className="thing_i_have_done_for_money">
                <h3><a href="http://www.nfusion.com/">nFusion</a></h3>

                <div className="metadata">
                  <span className="date_range">01/2007 - 04/2007</span>{' '}
                  <span className="position">Contractor</span>
                </div>

                <p>
                  Developed a e-sales application for a Fortune 500
                  sales team using PHP/MySQL &amp; a custom PHP5
                  framework similar to Sinatra/Rails.
                </p>
              </div>

              <div className="thing_i_have_done_for_money">
                <h3>WTS Bank</h3>

                <div className="metadata">
                  <span className="date_range">06/2005 - 11/2005</span>{' '}
                  <span className="position">Developer</span>
                </div>

                <p>
                  Used Perl &amp; Oracle to help process online ACH
                  transactions.
                </p>
              </div>

              <div className="thing_i_have_done_for_money">
                <h4>Plus Assorted College &amp; High School Jobs...</h4>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="clearboth">&nbsp;</div>

      <section id="portfolio">
        <h2><a name="portfolio-link">Open-Source &amp; Community</a></h2>

        <ul>
          <li>
            <a href="http://haystacksearch.org/"><img src="/img/resume/haystack.png" title="Haystack" className="screenshot" /></a>

            <h3><a href="http://haystacksearch.org/">Haystack</a></h3>

            <p>
              Haystack acts as a search layer for Django, similar to
              the Django ORM. Nice API &amp; lots of functionality.
              I'm the primary author.
            </p>
          </li>
          <li>
            <a href="http://tastypieapi.org/"><img src="/img/resume/tastypie.png" title="Tastypie" className="screenshot" /></a>

            <h3><a href="http://tastypieapi.org/">Tastypie</a></h3>

            <p>
              Tastypie is a library that adds RESTful APIs to your
              Django application. Full-featured &amp; designed to be
              easily extended. Also the primary author.
            </p>
          </li>
          <li>
            <a href="http://djangodash.com/"><img src="/img/resume/djangodash.png" title="Django Dash" className="screenshot" /></a>

            <h3><a href="http://djangodash.com/">Django Dash</a></h3>

            <p>
              The Django Dash is an annual 48-hour programming
              competition for Django. Teams of up to three compete
              for bragging rights &amp; prizes. I've run it for 7
              years now.
            </p>
          </li>
          <li>
            <a href="http://wsgiwrestle.com/"><img src="/img/resume/wsgiwrestle.png" title="WSGI Wrestle" className="screenshot" /></a>

            <h3><a href="http://wsgiwrestle.com/">WSGI Wrestle</a></h3>

            <p>
              The WSGI Wrestle is an annual 48-hour programming
              competition, similar to the Django Dash but for all
              Python programmers.
            </p>
          </li>
        </ul>
      </section>

      <footer>
        <em>Education: BBA - MIS from the <a href="http://www.uwosh.edu/">University of Wisconsin-Oshkosh</a> &mdash; 2000-2005.</em><br />
        <em>References available upon request.</em><br />
        <span className="snow">☃</span>
      </footer>
    </div>
  );
}
