'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

function Skills({ ...props }) {
  const professionalSkills = [
    { name: 'Python', url: 'https://python.org/' },
    { name: 'Django', url: 'https://djangoproject.com/' },
    { name: 'Javascript', url: 'https://www.javascript.com/' },
    { name: 'React', url: 'https://react.dev/' },
    { name: 'Preact', url: 'https://preactjs.com/' },
    { name: 'Next.js', url: 'https://nextjs.org/' },
    { name: 'HTML', url: 'https://en.wikipedia.org/wiki/HTML' },
    { name: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { name: 'Docker', url: 'https://docker.com/' },
    { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
    { name: 'AWS', url: 'https://aws.amazon.com/' },
    { name: 'Git', url: 'https://git-scm.com/' },
    { name: 'Node.js', url: 'https://nodejs.org/' },
    { name: 'PostGIS', url: 'https://postgis.net/' },
    { name: 'GDAL', url: 'https://gdal.org/index.html' },
    { name: 'OpenLayers', url: 'https://openlayers.org/' },
    { name: 'Redis', url: 'https://redis.io/' },
    { name: 'Elasticsearch', url: 'https://www.elastic.co/elasticsearch' },
    { name: 'Solr', url: 'https://solr.apache.org/' },
    { name: 'nginx', url: 'https://www.nginx.com/' },
    { name: 'memcached', url: 'https://memcached.org/' },
    { name: 'Lua', url: 'https://www.lua.org/' },
  ];
  const olderSkills = [
    { name: 'Google Cloud', url: 'https://cloud.google.com/' },
    { name: 'Typescript', url: 'https://www.typescriptlang.org/' },
    { name: 'Arduino', url: 'https://www.arduino.cc/' },
    { name: 'Go', url: 'https://go.dev/' },
    { name: 'Swift/Obj-C/Cocoa', url: 'https://developer.apple.com/swift/' },
    { name: 'Apache', url: 'https://apache.org/' },
    { name: 'MySQL', url: 'https://www.mysql.com/' },
    { name: 'Ruby', url: 'https://www.ruby-lang.org/en/' },
    { name: 'PHP', url: 'https://php.net/' },
    { name: 'Varnish', url: 'https://varnish-cache.org/' },
    { name: 'Mercurial', url: 'https://www.mercurial-scm.org/' },
    { name: 'Erlang', url: 'https://www.erlang.org/' },
    { name: 'Riak', url: 'https://riak.com/index.html' },
  ];

  return (
    <>
      <h2><a name="skills-link">Skills</a></h2>

      <dl>
        <dt>Professional</dt>
        {professionalSkills.map((skillInfo, offset) => (
          <dd key={offset}>
            <a
              href={skillInfo.url}
            >
              {skillInfo.name}
            </a>
          </dd>
        ))}

        <dt>Older/Experimental</dt>
        {olderSkills.map((skillInfo, offset) => (
          <dd key={offset}>
            <a href={skillInfo.url}>
              {skillInfo.name}
            </a>
          </dd>
        ))}
      </dl>
    </>
  );
}

function Disclosure({ collapsed, setCollapsed, ...props }) {
  return (
    <button
      type="button"
      className="inline-block mr-2"
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed
        ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        )
        : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        )
      }
    </button>
  );
}

function Experience({
  companyName,
  companyUrl = null,
  startDate,
  endDate,
  jobTitle,
  skillsUsed = [],
  setHighlightedSkills,
  allowCollapsed = false,
  ...props
}) {
  const [collapsed, setCollapsed] = useState(allowCollapsed);

  return (
    <div
      className="mb-8 flex flex-row"
      onMouseEnter={() => setHighlightedSkills(skillsUsed)}
      onMouseLeave={() => setHighlightedSkills([])}
    >
      {allowCollapsed && (
        <div
          className="align-top print:hidden"
        >
          <Disclosure
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </div>
      )}
      {!collapsed
        ? (
          <div>
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
          </div>
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
            <strong>Primary author</strong><br />
            Haystack acts as a search layer for Django, similar to
            the Django ORM. Nice API &amp; lots of functionality.
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
            <strong>Primary author</strong><br />
            Tastypie is a library that adds RESTful APIs to your
            Django application. Full-featured &amp; designed to be
            easily extended.
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
            <strong>Organizer</strong><br />
            The Django Dash is an annual 48-hour programming
            competition for Django. Teams of up to three compete
            for bragging rights &amp; prizes. Run from 2008&mdash;2014.
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
            <strong>Organizer</strong><br />
            The WSGI Wrestle is an annual 48-hour programming
            competition, similar to the Django Dash but for all
            Python programmers. Run once in 2014.
          </p>
        </div>
      </div>
    </>
  );
}

export default function Page(props) {
  const [highlightedSkills, setHighlightedSkills] = useState([]);

  return (
    <div className="container">
      <div className="md:flex md:flex-row print:flex print:flex-row">
        <div className="md:w-96 print:w-96">
          <header id="contact">
            <Contact />
          </header>

          <div className="mini-divider">&nbsp;</div>

          <section id="skills">
            <Skills
              highlightedSkills={highlightedSkills}
            />
          </section>

          <div className="mini-divider md:hidden">&nbsp;</div>

          <section
            className="portfolio md:hidden print:visible"
          >
            <Portfolio />
          </section>

          <div className="mini-divider md:hidden print:hidden">&nbsp;</div>
        </div>

        <div className="md:grow md:ml-8 print:grow print:ml-8">
          <section id="about">
            <About />
          </section>

          <div className="mini-divider">&nbsp;</div>

          <section id="experience">
            <h2><a name="experience-link">Experience</a></h2>

            <Experience
              companyName="Pawlicy Advisor"
              companyUrl="https://pawlicy.com/"
              startDate="05/2023"
              endDate="09/2023"
              jobTitle="Senior Software Engineer"
              skillsUsed={[
                'Python',
                'Django',
                'React',
                'Javascript',
                'Typescript',
                'Node.js',
                'PostgreSQL',
                'Redis',
                'Docker',
              ]}
              setHighlightedSkills={setHighlightedSkills}
            >
              Addressed a chunk of Django technical debt & helped improve local
              development, including Docker & debugging improvements.
              Spec&apos;d & built a Typescript-based revenue reconciliation
              system. Provided mentorship for others.
            </Experience>

            <Experience
              companyName="RevSys"
              companyUrl="https://revsys.com/"
              startDate="12/2021"
              endDate="05/2023"
              jobTitle="Software Engineer"
              skillsUsed={[
                'Python',
                'Django',
                'React',
                'Javascript',
                'Docker',
                'PostgreSQL',
                'Redis',
              ]}
              setHighlightedSkills={setHighlightedSkills}
            >
              Developed a Django API backend & React frontend for
              a white-labeled small business application. Upgraded a
              learning platform&apos;s Django backend & React frontend through
              several major framework versions of each.
            </Experience>

            <Experience
              companyName="Routable"
              companyUrl="https://routable.com/"
              startDate="06/2021"
              endDate="11/2021"
              jobTitle="Principal Software Engineer"
              skillsUsed={[
                'Python',
                'Django',
                'Docker',
                'PostgreSQL',
              ]}
              setHighlightedSkills={setHighlightedSkills}
            >
              Converted a large Python codebase to a container-based setup as
              part of improving CI/CD. Assisted in redesigning a large
              monolithic Django codebase into a service-based approach. Several
              internal technical planning documents for pending
              projects. Worked on improving a bulk import system using Django
              Rest Framework.
            </Experience>

            <Experience
              companyName="Cornea"
              companyUrl="https://cornea.is/"
              startDate="02/2020"
              endDate="05/2021"
              jobTitle="Software Engineer"
              skillsUsed={[
                'Python',
                'Django',
                'Javascript',
                'OpenLayers',
                'PostgreSQL',
                'PostGIS',
                'GDAL',
                'HTML',
                'CSS',
                'AWS',
                'Docker',
              ]}
              setHighlightedSkills={setHighlightedSkills}
            >
              Built a web-based mapping tool & scientific platform to
              support wildfire firefighting, using
              Django / PostGIS / GDAL / OpenLayers. Implemented several
              scientific whitepapers from scratch to compute potential
              control locations & suppression difficulty index, as
              well as all the component input calculations for ML processing.
              This also involved a wide array of data ingest and building out a
              full JS frontend to support it. Built out & automated full AWS
              infrastructure.
            </Experience>

            <Experience
              companyName="BriteCore"
              companyUrl="https://britecore.com/"
              startDate="01/2019"
              endDate="01/2020"
              jobTitle="Software Engineer"
              skillsUsed={[
                'Python',
                'Docker',
                'PostgreSQL',
              ]}
              setHighlightedSkills={setHighlightedSkills}
            >
              Rebuilt the development environment used by all Gen2
              developers, based on Docker & Compose. Rewrote the
              bootstrapping process for new environments in Python, cutting new
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
              skillsUsed={[
                'Python',
                'Django',
                'PostgreSQL',
                'Javascript',
                'HTML',
                'CSS',
                'Redis',
                'Node.js',
                'Google Cloud',
              ]}
              setHighlightedSkills={setHighlightedSkills}
            >
              Worked on the{' '}
              <a href="https://go.urbanairship.com/">Urban Airship</a>{' '}
              user interface in Django & pure Javascript, including several
              major features around timezones, third-party integrations,
              PostgreSQL data migrations, and a team-based permission system.
              Performed many code reviews, established internal
              documentation/procedures &amp; spent quite a bit of time
              mentoring.
            </Experience>

            <Experience
              companyName="Amazon Web Services"
              companyUrl="http://aws.amazon.com/"
              startDate="03/2013"
              endDate="03/2014"
              jobTitle="Python SDE II"
              skillsUsed={[
                'Python',
                'PostgreSQL',
                'AWS',
              ]}
              setHighlightedSkills={setHighlightedSkills}
            >
              Worked on <a href="http://docs.pythonboto.org/">boto</a> for
              Python, including adding a high-level interface for DynamoDB(2),
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
              skillsUsed={[
                'Python',
                'Django',
                'Javascript',
                'HTML',
                'CSS',
                'PostgreSQL',
                'Solr',
                'Elasticsearch',
                'Redis',
              ]}
              setHighlightedSkills={setHighlightedSkills}
              allowCollapsed={true}
            >
              Ran my own Python/Django consultancy. Originally just me, we
              had as many as three people. Helped many clients with
              their RESTful APIs, integrating search in Elasticsearch & Solr,
              as well as general development.
            </Experience>

            <Experience
              companyName="Mediaphormedia"
              startDate="06/2008"
              endDate="04/2011"
              jobTitle="Senior Web Developer"
              skillsUsed={[
                'Python',
                'Django',
                'PostgreSQL',
                'HTML',
                'CSS',
                'Varnish',
                'Apache',
                'Solr',
                'memcached',
                'Redis',
              ]}
              setHighlightedSkills={setHighlightedSkills}
              allowCollapsed={true}
            >
              Worked for the birthplace of Django developing Ellington, an
              award-winning news CMS. Ported it to Django 1.0, vastly revised
              the search functionality using Solr, added an API, worked on a
              Q&amp;A app, and lots of importers.
            </Experience>

            <Experience
              companyName="Forkinit"
              startDate="12/2009"
              endDate="02/2011"
              jobTitle="Co-founder"
              skillsUsed={[
                'Python',
                'Django',
                'Javascript',
                'HTML',
                'CSS',
                'PostgreSQL',
              ]}
              setHighlightedSkills={setHighlightedSkills}
              allowCollapsed={true}
            >
              Developed a more modern recipe site in Django. Took a structured
              approach, parsing recipe bodies to extract data. Allowed for
              &quot;forking&quot; a recipe (start with a base &amp; be able to
              make your changes).
            </Experience>

            <Experience
              companyName="Toast Driven (Round 1)"
              companyUrl="https://toastdriven.com/"
              startDate="04/2008"
              endDate="05/2008"
              jobTitle="Owner"
              skillsUsed={[
                'Ruby',
                'Ruby on Rails',
                'MySQL',
                'HTML',
                'CSS',
              ]}
              setHighlightedSkills={setHighlightedSkills}
              allowCollapsed={true}
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
              skillsUsed={[
                'PHP',
                'MySQL',
                'Javascript',
                'Ruby',
                'Ruby on Rails',
                'HTML',
                'CSS',
              ]}
              setHighlightedSkills={setHighlightedSkills}
              allowCollapsed={true}
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
              skillsUsed={[
                'PHP',
                'HTML',
                'CSS',
              ]}
              setHighlightedSkills={setHighlightedSkills}
              allowCollapsed={true}
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
              skillsUsed={[
                'Perl',
                'Oracle',
              ]}
              setHighlightedSkills={setHighlightedSkills}
              allowCollapsed={true}
            >
              Used Perl &amp; Oracle to help process online ACH
              transactions.
            </Experience>

            <div className="thing_i_have_done_for_money">
              <h4>Plus Assorted College &amp; High School Jobs...</h4>
            </div>
          </section>

          <div className="mini-divider">&nbsp;</div>

          <section
            className="portfolio md:visible print:hidden"
          >
            <Portfolio />
          </section>

          <div className="mini-divider md:hidden print:hidden">&nbsp;</div>
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
