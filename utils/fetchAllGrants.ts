export const fetchAllGrants = async () => {
  const res = await fetch(
    `https://research-info-2.vercel.app/api/getAllGrants`
  );
  const data = await res.json();
  const grants: Post[] = data.grants;

  return grants;
};
