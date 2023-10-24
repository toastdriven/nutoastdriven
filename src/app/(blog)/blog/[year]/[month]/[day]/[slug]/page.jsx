import Link from 'next/link';

import { marked } from 'marked';

import {
  fromShortMonth,
  toVerboseDate
} from '@/utils/dates';
import { buildBlogUrl } from '@/utils/formatting';
import { getPost } from '@/utils/posts';

export default async function PostDetail({ params, ...props }) {
  const post = await getPost(
    params.year,
    fromShortMonth(params.month),
    params.day,
    params.slug,
  );

  if (!post.date) {
    return (
      <>Not Found.</>
    )
  }

  return (
    <>
      <p className="back_up">
        <Link
          href={buildBlogUrl(params.year, fromShortMonth(params.month), params.day)}
        >
          &larr; Back to {toVerboseDate(post.date)}
        </Link>
      </p>

      <div className="entry">
        <h2>
          {post.title}
        </h2>

        <div
          className="entry_content"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
        >
        </div>

        <div className="metadata">
          By {post.author} on {toVerboseDate(post.date)}.
        </div>
      </div>
    </>
  );
}
