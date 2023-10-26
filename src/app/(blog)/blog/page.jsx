import Link from 'next/link';

import PostSummary from '@/components/PostSummary';
import { getAllPosts } from '@/utils/posts';

export const metadata = {
  title: 'All Posts',
};

export default async function AllPosts({ params, ...props }) {
  let posts = await getAllPosts();
  posts.reverse();

  return (
    <>
      <h2>All Posts</h2>

      <p className="back_up">
        <Link
          href={'/'}
        >
          &larr; Back to home
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
