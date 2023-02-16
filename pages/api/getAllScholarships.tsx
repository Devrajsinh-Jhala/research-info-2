// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";

const query = groq`
*[_type == 'scholarships']{
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`;
type Data = {
  scholarships: Post[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const scholarships: Post[] = await sanityClient.fetch(query);
  res.status(200).json({ scholarships });
}
