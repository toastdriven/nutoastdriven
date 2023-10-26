import Link from 'next/link';

import PostSummary from '@/components/PostSummary';
import {
  fromShortMonth,
  toShortMonth,
  toFullMonth,
} from '@/utils/dates';
import { buildBlogUrl } from '@/utils/formatting';
import {
  getAllPosts,
  getPostsByMonth,
} from '@/utils/posts';

export async function generateMetadata({ params }) {
  const numericMonth = fromShortMonth(params.month);

  return {
    title: `All Posts for ${toFullMonth(numericMonth)}, ${params.year}`,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    year: post.date.getFullYear().toString(),
    month: toShortMonth(post.date.getMonth()),
    // day: post.date.getDate().toString().padStart(2, '0'),
    // slug: post.slug,
  }));
}

export default async function PostsByMonth({ params, ...props }) {
  const numericMonth = fromShortMonth(params.month);
  let posts = await getPostsByMonth(params.year, numericMonth);
  posts.reverse();

  return (
    <>
      <h2>{toFullMonth(numericMonth)}, {params.year}</h2>

      <p className="back_up">
        <Link
          href={buildBlogUrl(params.year)}
        >
          &larr; Back to {params.year}
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
