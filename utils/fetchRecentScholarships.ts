export const fetchRecentScholarships = async () => {
  const res = await fetch(
    `https://research-info-2.vercel.app/api/getRecentScholarships`
  );
  const data = await res.json();
  const recentScholarships: Post[] = data.recentScholarships;

  return recentScholarships;
};
