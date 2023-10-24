import Link from 'next/link';

import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

import { toVerboseDate } from '@/utils/dates';
import { truncateWords } from '@/utils/formatting';

export default function PostSummary({ post, ...props }) {
  const rawContent = marked.parse(truncateWords(post.content, 35))
  const cleanedContent = DOMPurify.sanitize(rawContent, { ALLOWED_TAGS: [] });

  return (
    <div className="entry">
      <h3>
        <Link
          href={post.url}
          title={post.title}
        >
          {truncateWords(post.title, 10)}
        </Link>
      </h3>

      <p>{cleanedContent}</p>

      <div className="metadata">
        By {post.author} on {toVerboseDate(post.date)}.
      </div>
    </div>
  );
}
