import fs from 'fs';
import path from 'path';

import { globSync } from 'glob';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), '..', '..', 'posts');

export function getAllPosts() {
  const postsData = [];
  let posts = globSync(`${postsDir}/**/*.md`);

  posts.sort();

  posts.map((postFileName) => {
    const rawPost = fs.readFileSync(postFileName, 'utf8');
    const post = matter(rawPost);
    postsData.push(post);
  });

  return postsData;
}
