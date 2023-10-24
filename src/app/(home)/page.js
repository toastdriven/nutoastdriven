import Link from 'next/link';

import { getAllPosts } from '../../utils/posts';

export default async function Home(props) {
  const allPostsData = await getAllPosts();

  function toDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  function truncateWords(text) {
    const bits = text.split(' ');
    return bits.slice(0, 10).join(' ');
  }

  return (
    <>
      <p>
        ...is the online moniker of <Link href="/daniellindsley/">Daniel Lindsley</Link>.
        I write <a href="https://github.com/toastdriven">open-source software</a>.
      </p>

      <p>
        Toast Driven has also twice existed in the past
        as a software consultancy, notably specializing in:
        <a href="http://djangoproject.com/">Django</a>,
        <a href="http://python.org/">Python</a>, Javascript, search &amp; REST
        APIs. I also run a couple projects (such as the
        <a href="http://djangodash.com/">Django Dash</a>) as TD.
      </p>

      <p>
        For now, Toast Driven (the company) is sleeping. However, you can
        still find the following <Link href="/blog/">blog posts</Link> on this site:
      </p>

      <ul>
        {allPostsData.map((entry) => (
          <li>
            <span className="date">{toDate(entry.publish_on)}</span> &mdash;
            <Link href="{entry.get_absolute_url}">
              {truncateWords(entry.title, 10)}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
