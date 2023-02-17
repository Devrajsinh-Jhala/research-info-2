export const fetchRecentGrants = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getRecentGrants`
  );
  const data = await res.json();
  const recentGrants: Post[] = data.recentGrants;

  return recentGrants;
};