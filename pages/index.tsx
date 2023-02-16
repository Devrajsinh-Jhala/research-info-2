import { groq } from "next-sanity";
import React from "react";
import Navbar from "../components/Navbar";
import { sanityClient } from "../sanity";

type Props = {};
const query = groq`
*[_type == 'scholarships']{
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)[0..2]
`;

const Home = (props: Props) => {
  // const recentPosts = await sanityClient.fetch(query);
  return (
    <div>
      <Navbar />
      {/* {console.log(recentPosts)} */}
    </div>
  );
};

export default Home;
