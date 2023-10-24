import Link from 'next/link';

import { toDate, truncateWords } from '@/utils/formatting';
import { getAllPosts } from '@/utils/posts';

export default async function Home(props) {
  let allPostsData = await getAllPosts();
  allPostsData.reverse();

  return (
    <>
      <p>
        ...is the online moniker of <Link href="/daniellindsley/">Daniel Lindsley</Link>.
        I write <a href="https://github.com/toastdriven">open-source software</a>.
      </p>

      <p>
        Toast Driven has also twice existed in the past
        as a software consultancy, notably specializing in:{' '}
        <a href="http://djangoproject.com/">Django</a>,
        <a href="http://python.org/">Python</a>, Javascript, search &amp; REST
        APIs. I also run a couple projects (such as the{' '}
        <a href="http://djangodash.com/">Django Dash</a>) as TD.
      </p>

      <p>
        For now, Toast Driven (the company) is sleeping. However, you can
        still find the following <Link href="/blog/">blog posts</Link> on this site:
      </p>

      <ul>
        {allPostsData.map((entry, offset) => (
          <li key={offset}>
            <span className="date">{toDate(entry.date)}</span> &mdash;{' '}
            <Link href={entry.url}>
              {truncateWords(entry.title, 10)}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
