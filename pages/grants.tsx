import { GetServerSideProps } from "next";
import React from "react";
import ListComponents from "../components/ListComponents";
import Navbar from "../components/Navbar";
import { fetchAllGrants } from "../utils/fetchAllGrants";
type Props = {
  grants: Post[];
};

const Scholarships = ({ grants }: Props) => {
  return (
    <div className="max-w-[850px] mx-auto">
      <Navbar />
      <ListComponents scholarships={grants} />
    </div>
  );
};

export default Scholarships;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const grants: Post[] = await fetchAllGrants();
  return {
    props: {
      grants,
    },
  };
};
