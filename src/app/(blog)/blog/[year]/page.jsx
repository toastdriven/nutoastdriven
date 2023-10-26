import Link from 'next/link';

import PostSummary from '@/components/PostSummary';
import { buildBlogUrl } from '@/utils/formatting';
import { getPostsByYear } from '@/utils/posts';

export async function generateMetadata({ params }) {
  return {
    title: `All Posts for ${params.year}`,
  };
}

export default async function PostsByYear({ params, ...props }) {
  let posts = await getPostsByYear(params.year);
  posts.reverse();

  return (
    <>
      <h2>{params.year}</h2>

      <p className="back_up">
        <Link
          href={buildBlogUrl()}
        >
          &larr; Back to full list
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
