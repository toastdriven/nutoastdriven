'use client';
import Image from 'next/image';
import { useState } from 'react';

function Contact(props) {
  return (
    <div className="vcard">
      <h1>
        Hi, I&apos;m{' '}
      </h1>
      <h1>
        <div className="n">
          <div className="given-name">Daniel</div>
          <div className="family-name">Lindsley</div>
        </div>
      </h1>

      <div className="contact_info">
        <div className="pronouns">
          He / Him
        </div>

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
    </div>
  );
}

function About(props) {
  return (
    <>
      <h2><a name="about-link">About</a></h2>

      <p>
        I&apos;m a developer specializing in web-based technologies.
        I&apos;m a pretty full-stack kinda guy, comfy with everything from
        database schema design to broad system architecture to front-end
        HTML/CSS/Javascript work. I write well-tested code &amp; aim to
        constantly improve.
      </p>

      <p>
        Outside of work, I love working on open-source, playing
        video games, playing/composing music, reading, snowboarding,
        &amp; bicycling.
      </p>
    </>
  );
}

function Skills(props) {
  return (
    <>
      <h2><a name="skills-link">Skills</a></h2>

      <dl>
        <dt>Professional</dt>
        <dd>Python</dd>
        <dd>Django</dd>
        <dd>Javascript</dd>
        <dd>React</dd>
        <dd>Preact</dd>
        <dd>Next.js</dd>
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
    </>
  );
}

function Experience({
  companyName,
  companyUrl = null,
  startDate,
  endDate,
  jobTitle,
  setFeaturedSkills,
  initialCollapsed = false,
  ...props
}) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  return (
    <div
      className="mb-8 cursor-pointer"
      onClick={() => setCollapsed(!collapsed)}
    >
      {!collapsed
        ? (
          <>
            <h3>
              {companyUrl
                ? (
                  <a href={companyUrl}>
                    {companyName}
                  </a>
                )
                : companyName
              }
            </h3>

            <div className="metadata">
              <span className="date_range">{startDate} - {endDate}</span>{' '}
              <span className="position">({jobTitle})</span>
            </div>

            <p>
              {props.children}
            </p>
          </>
        )
        : (
          <div
            className="flex flex-row flex-wrap leading-4"
          >
            <h3 className="inline mr-2">
              {companyUrl
                ? (
                  <a href={companyUrl}>
                    {companyName}
                  </a>
                )
                : companyName
              }
            </h3>

            <span className="text-zinc-500 mt-[0.4rem]">
              <span className="date_range">{startDate} - {endDate}</span>{' '}
              <span className="position">({jobTitle})</span>
            </span>
          </div>
        )
      }
    </div>
  );
}

function Portfolio(props) {
  return (
    <>
      <h2><a name="portfolio-link">Open-Source &amp; Community</a></h2>

      <div className="flex flex-row flex-wrap gap-2">
        <div className="piece">
          <a href="http://haystacksearch.org/">
            <Image
              src="/img/resume/haystack.png"
              alt="Haystack"
              className="screenshot"
              width={180}
              height={96}
            />
          </a>

          <h3><a href="http://haystacksearch.org/">Haystack</a></h3>

          <p>
            Haystack acts as a search layer for Django, similar to
            the Django ORM. Nice API &amp; lots of functionality.
            I&apos;m the primary author.
          </p>
        </div>

        <div className="piece">
          <a href="http://tastypieapi.org/">
            <Image
              src="/img/resume/tastypie.png"
              alt="Tastypie"
              className="screenshot"
              width={180}
              height={96}
            />
          </a>

          <h3><a href="http://tastypieapi.org/">Tastypie</a></h3>

          <p>
            Tastypie is a library that adds RESTful APIs to your
            Django application. Full-featured &amp; designed to be
            easily extended. Also the primary author.
          </p>
        </div>

        <div className="piece">
          <a href="http://djangodash.com/">
            <Image
              src="/img/resume/djangodash.png"
              alt="Django Dash"
              className="screenshot"
              width={180}
              height={96}
            />
          </a>

          <h3><a href="http://djangodash.com/">Django Dash</a></h3>

          <p>
            The Django Dash is an annual 48-hour programming
            competition for Django. Teams of up to three compete
            for bragging rights &amp; prizes. I&apos;ve run it for 7
            years.
          </p>
        </div>

        <div className="piece">
          <a href="http://wsgiwrestle.com/">
            <Image
              src="/img/resume/wsgiwrestle.png"
              alt="WSGI Wrestle"
              className="screenshot"
              width={180}
              height={96}
            />
          </a>

          <h3><a href="http://wsgiwrestle.com/">WSGI Wrestle</a></h3>

          <p>
            The WSGI Wrestle is an annual 48-hour programming
            competition, similar to the Django Dash but for all
            Python programmers.
          </p>
        </div>
      </div>
    </>
  );
}

export default function Page(props) {
  return (
    <div className="container">
      <div className="md:flex md:flex-row print:flex print:flex-row">
        <div className="md:w-96 print:w-96">
          <header id="contact">
            <Contact />
          </header>

          <div class="mini-divider">&nbsp;</div>

          <section id="skills">
            <Skills />
          </section>

          <div class="mini-divider md:hidden">&nbsp;</div>

          <section
            className="portfolio md:hidden print:visible"
          >
            <Portfolio />
          </section>

          <div class="mini-divider md:hidden print:hidden">&nbsp;</div>
        </div>

        <div className="md:grow md:ml-8 print:grow print:ml-8">
          <section id="about">
            <About />
          </section>

          <div class="mini-divider">&nbsp;</div>

          <section id="experience">
            <h2><a name="experience-link">Experience</a></h2>

            <Experience
              companyName="Pawlicy Advisor"
              companyUrl="https://pawlicy.com/"
              startDate="05/2023"
              endDate="09/2023"
              jobTitle="Senior Software Engineer"
            >
              Addressed a chunk of technical debt & helped improve local
              development, including Docker & debugging improvements.
              Spec&apos;d & built a revenue reconciliation system.
              Provided mentorship for others.
            </Experience>

            <Experience
              companyName="RevSys"
              companyUrl="https://revsys.com/"
              startDate="12/2021"
              endDate="05/2023"
              jobTitle="Software Engineer"
            >
              Developed an API backend & React-based SPA frontend for
              a white-labeled small business application. Upgraded a
              learning platform&apos;s backend & frontend through several
              major framework versions.
            </Experience>

            <Experience
              companyName="Routable"
              companyUrl="https://routable.com/"
              startDate="06/2021"
              endDate="11/2021"
              jobTitle="Principal Software Engineer"
            >
              Converted a large codebase to a container-based setup as
              part of improving CI/CD. Assisted in redesigning a large
              monolithic codebase into a service-based approach. Several
              internal technical planning documents for pending
              projects. Worked on improving a bulk import system.
            </Experience>

            <Experience
              companyName="Cornea"
              companyUrl="https://cornea.is/"
              startDate="02/2020"
              endDate="05/2021"
              jobTitle="Software Engineer"
            >
              Built a web-based mapping tool & scientific platform to
              support wildfire firefighting. Implemented several
              scientific whitepapers from scratch to compute potential
              control locations & suppression difficulty index, as
              well as all the component calculations. Also involved a
              wide array of data ingest, and building out a full JS
              frontend to support it. Built out & automated full AWS
              infrastructure.
            </Experience>

            <Experience
              companyName="BriteCore"
              companyUrl="https://britecore.com/"
              startDate="01/2019"
              endDate="01/2020"
              jobTitle="Software Engineer"
            >
              Rebuilt the development environment used by all Gen2
              developers, based on Docker & Compose. Rewrote the
              bootstrapping process for new environments, cutting new
              setup time from days down to 20 minutes. Provided user
              support & 8 releases for a community of ~150 developers.
              Ad-hoc managed a team of 4 for several months. Helped
              improve performance, security & test coverage.
            </Experience>

            <Experience
              companyName="Urban Airship"
              companyUrl="https://urbanairship.com/"
              startDate="03/2014"
              endDate="01/2019"
              jobTitle="Senior Web Developer"
            >
              Worked on the{' '}
              <a href="https://go.urbanairship.com/">Urban Airship</a>{' '}
              user interface, including several major features around
              timezones, third-party integrations, data migrations and
              a team-based permission system. Performed many code
              reviews, established internal documentation/procedures
              &amp; spent quite a bit of time mentoring.
            </Experience>

            <Experience
              companyName="Amazon Web Services"
              companyUrl="http://aws.amazon.com/"
              startDate="03/2013"
              endDate="03/2014"
              jobTitle="Python SDE II"
            >
              Worked on <a href="http://docs.pythonboto.org/">boto</a>,
              including adding a high-level interface for DynamoDB(2),
              approximately a dozen releases &amp; many service updates.
              Also developed the initial code for{' '}
              <a href="https://github.com/toastdriven/boto3">boto3</a>.
              Conducted a number of interviews, many code reviews &amp;
              time mentoring.
            </Experience>

            <Experience
              companyName="Toast Driven"
              companyUrl="http://toastdriven.com/"
              startDate="05/2011"
              endDate="12/2012"
              jobTitle="Owner/Founder/Head Bit Herder"
              collapsed={true}
            >
              Ran my own Python/Django consultancy. Originally just me, we
              had as many as three people. Helped many clients with
              their RESTful APIs, integrating search as well as general
              development.
            </Experience>

            <Experience
              companyName="Mediaphormedia"
              startDate="06/2008"
              endDate="04/2011"
              jobTitle="Senior Web Developer"
              initialCollapsed={true}
            >
              Worked for the birthplace of Django developing Ellington, an
              award-winning news CMS. Ported it to Django 1.0, vastly revised
              the search functionality, added an API, worked on a Q&amp;A
              app, lots of importers.
            </Experience>

            <Experience
              companyName="Forkinit"
              startDate="12/2009"
              endDate="02/2011"
              jobTitle="Co-founder"
              initialCollapsed={true}
            >
              Developed a more modern recipe site. Took a structured approach,
              parsing recipe bodies to extract data. Allowed for &quot;forking&quot;
              a recipe (start with a base &amp; be able to make your changes).
            </Experience>

            <Experience
              companyName="Toast Driven (Round 1)"
              companyUrl="https://toastdriven.com/"
              startDate="04/2008"
              endDate="05/2008"
              jobTitle="Owner"
              initialCollapsed={true}
            >
              Run as a Ruby on Rails shop for short period of time.
              Worked on a reporting site (using Flex, Actionscript &amp; Rails)
              to produce nice charts/graphs for surveying software.
            </Experience>

            <Experience
              companyName="Live Oak"
              companyUrl="http://liveoak360.com/"
              startDate="11/2005"
              endDate="04/2008"
              jobTitle="Web Developer"
              initialCollapsed={true}
            >
              Did PHP/MySQL development for a variety of clients.
              Tasks included developing on multi-lingual CMSes, several
              e-commerce sites, hosting &amp; server administration,
              &amp; the development of a PHP5 web framework called Acorn.
              Also some Rails development for a client.
            </Experience>

            <Experience
              companyName="nFusion"
              companyUrl="http://www.nfusion.com/"
              startDate="01/2007"
              endDate="04/2007"
              jobTitle="Contractor"
              initialCollapsed={true}
            >
              Developed a e-sales application for a Fortune 500
              sales team using PHP/MySQL &amp; a custom PHP5
              framework similar to Sinatra/Rails.
            </Experience>

            <Experience
              companyName="WTS Bank"
              startDate="06/2005"
              endDate="11/2005"
              jobTitle="Developer"
              initialCollapsed={true}
            >
              Used Perl &amp; Oracle to help process online ACH
              transactions.
            </Experience>

            <div className="thing_i_have_done_for_money">
              <h4>Plus Assorted College &amp; High School Jobs...</h4>
            </div>
          </section>

          <div class="mini-divider">&nbsp;</div>

          <section
            className="portfolio md:visible print:hidden"
          >
            <Portfolio />
          </section>

          <div class="mini-divider md:hidden print:hidden">&nbsp;</div>
        </div>
      </div>

      <footer>
        <div className="italic">
          Education: BBA - MIS from the{' '}
          <a href="http://www.uwosh.edu/">University of Wisconsin-Oshkosh</a>{' '}
          &mdash; 2000-2005.
        </div>

        <div className="italic">
          References available upon request.
        </div>

        <div className="snow">☃</div>
      </footer>
    </div>
  );
}
