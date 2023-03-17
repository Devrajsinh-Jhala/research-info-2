export const fetchAllScholarships = async () => {
  const res = await fetch(
    `https://research-info-2.vercel.app/api/getAllScholarships`
  );
  const data = await res.json();
  const scholarships: Post[] = data.scholarships;

  return scholarships;
};
