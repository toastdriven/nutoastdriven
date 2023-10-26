import { getAllPosts } from '@/utils/posts';

export default async function sitemap() {
  const baseURL = 'https://toastdriven.com';

  let allPostsData = await getAllPosts();
  allPostsData.reverse();

  const baseURLs = [
    {
      url: baseURL,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${baseURL}/daniellindsley`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
  const blogURLs = allPostsData.map((post) => {
    return {
      url: `${baseURL}${post.url}`,
      lastModified: post.date,
      changeFrequency: 'monthly',
      priority: 0.5,
    }
  });

  return baseURLs.slice().concat(blogURLs);
}
