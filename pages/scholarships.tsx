import { GetServerSideProps } from "next";
import React from "react";
import ListComponents from "../components/ListComponents";
import Navbar from "../components/Navbar";
import { fetchAllScholarships } from "../utils/fetchAllScholarships";

type Props = {
  scholarships: Post[];
};

const Scholarships = ({ scholarships }: Props) => {
  return (
    <div className="max-w-[850px] mx-auto">
      <Navbar />
      <ListComponents scholarships={scholarships} />
    </div>
  );
};

export default Scholarships;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const scholarships: Post[] = await fetchAllScholarships();
  return {
    props: {
      scholarships,
    },
  };
};
