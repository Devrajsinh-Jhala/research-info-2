import { PortableText } from "@portabletext/react";
import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Navbar from "../../components/Navbar";
import { RichTextComponents } from "../../components/RichTextComponents";
import urlFor, { sanityClient } from "../../sanity";

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Navbar />
      <article className="px-10  pb-28">
        <section className="space-y-2 border border-[#f7ab0a] text-white">
          <div className="relative z-[-10] min-h-56 flex flex-col md:flex-row justify-between">
            <div className="absolute z-[-10] top-0 w-full h-full opacity-10 blur-sm p-10">
              <Image
                className="object-cover object-center mx-auto"
                src={urlFor(post?.mainImage && post.mainImage).url()}
                alt={post.title}
                fill
              />
            </div>
            <section className="p-5 bg-[#f7ab0a] w-full">
              <div className="flex flex-col md:flex-row justify-between gap-y-5">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold">{post.title}</h1>

                  <p>
                    {new Date(post._createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {post.author.image && (
                    <Image
                      className="rounded-full"
                      src={urlFor(post.author.image).url()}
                      alt={post.author.name}
                      height={40}
                      width={40}
                    />
                  )}
                  <div className="w-64">
                    <h3 className="text-lg font-bold">{post.author.name}</h3>
                    {/* Author Bio */}
                    <PortableText
                      value={post.author.bio}
                      components={RichTextComponents}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-end mt-auto space-x-2">
                  {post.categories.map((category, i) => (
                    <p
                      className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                      key={i}
                    >
                      {category.title}
                    </p>
                  ))}
                </div>
                <p className="text-white ">{post.description}</p>
              </div>
            </section>
          </div>
        </section>

        <article className="my-10">
          <PortableText value={post.body} components={RichTextComponents} />
        </article>

        <hr className="border-[#f7ab0a] border" />
      </article>
    </>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = groq`
    *[_type=="scholarships" || _type=="grants"]{
 
        slug
    }
    `;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const query = groq`
    *[_type=="scholarships" || _type=="grants" && slug.current == $slug][0]{
author->{
name,
  image,
  bio
},
        categories[]->{
          title,
        },
title,
slug,
mainImage,
body,
_id,
_createdAt,
_rev,
_type,
_updatedAt
    }
    `;
  const post: Post = await sanityClient.fetch(query, { slug: params?.slug });
  return {
    props: {
      post,
    },
  };
};
