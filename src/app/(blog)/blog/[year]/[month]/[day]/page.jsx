import Link from 'next/link';

import PostSummary from '@/components/PostSummary';
import {
  fromShortMonth,
  toShortMonth,
  toFullMonth,
  toVerboseDate,
} from '@/utils/dates';
import { buildBlogUrl } from '@/utils/formatting';
import {
  getAllPosts,
  getPostsByDay,
} from '@/utils/posts';

export async function generateMetadata({ params }) {
  const numericMonth = fromShortMonth(params.month);
  const day = parseInt(params.day);

  return {
    title: `All Posts for ${toFullMonth(numericMonth)} ${day}, ${params.year}`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    year: post.date.getFullYear().toString(),
    month: toShortMonth(post.date.getMonth()),
    day: post.date.getDate().toString().padStart(2, '0'),
    // slug: post.slug,
  }));
}

export default async function PostsByDay({ params, ...props }) {
  const numericMonth = fromShortMonth(params.month);
  const posts = await getPostsByDay(params.year, numericMonth, params.day);
  const archiveDate = new Date(params.year, numericMonth, params.day);

  return (
    <>
      <h2>{toVerboseDate(archiveDate)}</h2>

      <p className="back_up">
        <Link
          href={buildBlogUrl(params.year, numericMonth)}
        >
          &larr; Back to {toFullMonth(numericMonth)}, {params.year}
        </Link>
      </p>

      <div className="entries">
        <ul>
          {posts.map((post, offset) => (
            <li key={offset}>
              <PostSummary post={post} />
            </li>
          ))}
          {!posts.length && (
            <p>Sorry, doesn&rsquo;t look like we&rsquo;ve released any blog posts.</p>
          )}
        </ul>
      </div>
    </>
  );
}
