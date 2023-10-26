import Link from 'next/link';

import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

import {
  fromShortMonth,
  toShortMonth,
  toVerboseDate
} from '@/utils/dates';
import {
  buildBlogUrl,
  truncateWords
} from '@/utils/formatting';
import {
  getAllPosts,
  getPost,
} from '@/utils/posts';

export async function generateMetadata({ params }) {
  const post = await getPost(
    params.year,
    fromShortMonth(params.month),
    params.day,
    params.slug,
  );

  if (!post.date) {
    return {
      title: 'Not Found'
    };
  }

  const rawContent = marked.parse(truncateWords(post.content, 35))
  const cleanedContent = DOMPurify.sanitize(rawContent, { ALLOWED_TAGS: [] });

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      description: cleanedContent,
      type: 'article',
      publishedTime: post.date.toISOString(),
      authors: [post.author],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    year: post.date.getFullYear().toString(),
    month: toShortMonth(post.date.getMonth()),
    day: post.date.getDate().toString().padStart(2, '0'),
    slug: post.slug,
  }));
}

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
