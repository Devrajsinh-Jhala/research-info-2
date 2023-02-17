export const fetchRecentScholarships = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getRecentScholarships`
  );
  const data = await res.json();
  const recentScholarships: Post[] = data.recentScholarships;

  return recentScholarships;
};
