import fs from 'fs';
import path from 'path';

import { globSync } from 'glob';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');
const monthMap = {
  0: 'jan',
  1: 'feb',
  2: 'mar',
  3: 'apr',
  4: 'may',
  5: 'jun',
  6: 'jul',
  7: 'aug',
  8: 'sep',
  9: 'oct',
  10: 'nov',
  11: 'dec',
};

export function getAllPosts() {
  const postsData = [];
  let posts = globSync(`${postsDir}/**/*.md`);

  posts.sort();

  posts.map((postFileName) => {
    const rawPost = fs.readFileSync(postFileName, 'utf8');
    const parsedPost = matter(rawPost);
    const post = { content: parsedPost.content, ...parsedPost.data };

    const date = new Date(post.date)
    post.date = date;
    const year = date.getFullYear();
    const month = monthMap[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    post.url = `/blog/${year}/${month}/${day}/${post.slug}`;

    postsData.push(post);
  });

  return postsData;
}

export function getPostsByYear(year) {
  const allPosts = getAllPosts();
  const foundPosts = [];

  for (const post of allPosts) {
    if (post.date.getFullYear().toString() !== year.toString()) {
      continue;
    }

    foundPosts.push(post);
    break;
  }

  return foundPosts;
}

export function getPostByMonth(year, month, day, slug) {
  const allPosts = getAllPosts();
  const foundPosts = [];

  for (const post of allPosts) {
    if (post.date.getFullYear().toString() !== year.toString()) {
      continue;
    }

    if (post.date.getMonth().toString() !== month.toString()) {
      continue;
    }

    foundPosts.push(post);
    break;
  }

  return foundPosts;
}

export function getPostsByDay(year, month, day, slug) {
  const allPosts = getAllPosts();
  const foundPosts = [];

  for (const post of allPosts) {
    if (post.date.getFullYear().toString() !== year.toString()) {
      continue;
    }

    if (post.date.getMonth().toString() !== month.toString()) {
      continue;
    }

    if (post.date.getDate().toString().padStart(2, '0') !== day.toString()) {
      continue;
    }

    foundPosts.push(post);
    break;
  }

  return foundPosts;
}

export function getPost(year, month, day, slug) {
  // console.log(`Looking for: ${year}, ${month}, ${day}, ${slug}`);
  const allPosts = getAllPosts();
  let foundPost = {};

  for (const post of allPosts) {
    if (post.date.getFullYear().toString() !== year.toString()) {
      // console.log(`Failed match on: ${post.date.getFullYear()} !== ${year}`);
      continue;
    }

    if (post.date.getMonth().toString() !== month.toString()) {
      // console.log(`Failed match on: ${post.date.getMonth()} !== ${month}`);
      continue;
    }

    if (post.date.getDate().toString().padStart(2, '0') !== day.toString()) {
      // console.log(`Failed match on: ${post.date.getDate()} !== ${day}`);
      continue;
    }

    if (post.slug !== slug) {
      // console.log(`Failed match on: ${post.slug} !== ${slug}`);
      continue;
    }

    foundPost = post;
    break;
  }

  return foundPost;
}
