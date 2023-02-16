// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";

const query = groq`
*[_type == 'scholarships']{
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)[0..2]
`;
type Data = {
  recentPosts: Post[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const recentPosts: Post[] = await sanityClient.fetch(query);
  res.status(200).json({ recentPosts });
}
