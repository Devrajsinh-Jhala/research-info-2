import { GetServerSideProps } from "next";
import Head from "next/head";

import React from "react";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";
import { fetchRecentGrants } from "../utils/fetchRecentGrants";

import { fetchRecentScholarships } from "../utils/fetchRecentScholarships";

type Props = {
  recentScholarships: Post[];
  recentGrants: Post[];
};

const Home = ({ recentScholarships, recentGrants }: Props) => {
  return (
    <div>
      <Head>
        <title>Research Info</title>
      </Head>
      <Navbar />

      <main className="max-w-[900px] mx-auto">
        <p>Recent Scholarships:</p>
        <PostList posts={recentScholarships} />

        <p>Recent Grants:</p>
        <PostList posts={recentGrants} />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const recentScholarships: Post[] = await fetchRecentScholarships();
  const recentGrants: Post[] = await fetchRecentGrants();
  return {
    props: {
      recentScholarships,
      recentGrants,
    },
  };
};
