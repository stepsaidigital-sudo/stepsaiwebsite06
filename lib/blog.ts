import blog from '@/content/hubs/blog.json';

// Blog posts from content/hubs/blog.json, newest first. `id` is the stable key
// (counts up from the oldest post); `slug` is the URL: /blog/<slug>/.

export type BlogPost = { id: number; slug: string; url: string; title: string; excerpt: string; image: string; author: string; date: string; topic: string };

const posts: BlogPost[] = blog.posts;
const byId = new Map(posts.map(p => [p.id, p]));
const bySlug = new Map(posts.map(p => [p.slug, p]));

export const listPosts = () => posts;
export const getPostById = (id: number) => byId.get(id);
export const getPost = (slug: string) => bySlug.get(slug);

/** Up to `count` other posts, same topic first, then the newest of the rest. */
export function relatedPosts(post: BlogPost, count = 3) {
  const others = posts.filter(p => p.id !== post.id);
  return [...others.filter(p => p.topic === post.topic), ...others.filter(p => p.topic !== post.topic)].slice(0, count);
}
