import Image from "next/image";
import React, { useState } from "react";
import urlFor from "../sanity";
import ClientSideRoute from "./ClientSideRoute";

type Props = {
  scholarships: Post[];
};

const ListComponents = ({ scholarships }: Props) => {
  // Search Functionality
  const [search, setSearch] = useState("");
  return (
    <>
      <form className="max-w-[900px] px-10 mx-auto">
        <label className="mb-5 block">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="shadow border rounded py-2 px-3 mt-1 block w-full focus:outline-none ring-yellow-500"
            type="text"
            placeholder="Search by title..."
          />
        </label>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-10 gap-y-16 pb-24">
        {scholarships
          .filter((post) => {
            return search.toLowerCase() == ""
              ? post
              : post.title.toLowerCase().includes(search.toLowerCase());
          })
          .map((scholarship) => (
            <ClientSideRoute
              key={scholarship._id}
              route={`/post/${scholarship.slug.current}`}
            >
              <div className="flex flex-col cursor-pointer group">
                <div className="relative w-full z-[-10] h-52 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                  <Image
                    className="object-cover   lg:object-center"
                    src={urlFor(
                      scholarship?.mainImage && scholarship.mainImage
                    ).url()}
                    alt={scholarship.title}
                    fill
                  />
                  <div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white p-5 flex justify-between">
                    <div>
                      <p className="font-bold">{scholarship.title}</p>

                      <p>
                        {new Date(scholarship._createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 items-center">
                      {scholarship.categories.map((category, i) => (
                        <div
                          key={i}
                          className="bg-[#f7ab0a] text-xs text-center text-black px-3 py-1 rounded-full font-semibold"
                        >
                          <p>{category.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex-1">
                  <p className="text-lg font-bold">{scholarship.title}</p>
                </div>
              </div>
            </ClientSideRoute>
          ))}
      </div>
    </>
  );
};

export default ListComponents;
