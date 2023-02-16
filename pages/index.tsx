import { GetServerSideProps } from "next";

import React from "react";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";

import { fetchRecentPosts } from "../utils/fetchRecentPosts";

type Props = {
  recentPosts: Post[];
};

const Home = ({ recentPosts }: Props) => {
  return (
    <div>
      <Navbar />

      <main className="max-w-[900px] mx-auto">
        <PostList posts={recentPosts} />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const recentPosts: Post[] = await fetchRecentPosts();
  return {
    props: {
      recentPosts,
    },
  };
};
