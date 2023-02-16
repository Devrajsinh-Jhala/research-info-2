export const fetchRecentPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getRecentPosts`
  );
  const data = await res.json();
  const recentPosts: Post[] = data.recentPosts;

  return recentPosts;
};
