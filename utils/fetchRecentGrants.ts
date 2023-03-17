export const fetchRecentGrants = async () => {
  const res = await fetch(
    `https://research-info-2.vercel.app/api/getRecentGrants`
  );
  const data = await res.json();
  const recentGrants: Post[] = data.recentGrants;

  return recentGrants;
};
