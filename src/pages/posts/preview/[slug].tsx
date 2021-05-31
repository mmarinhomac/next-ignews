import { GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";

import styled from '../post.module.scss';

interface PostPreviewProps {
  post : {
    slug: string,
    title: string,
    content: string,
    updateAt: string,
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const [ session ] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.acactiveSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <main className={styled.container}>
        <article className={styled.post}>
          <h1>{post.title}</h1>
          <time>{post.updateAt}</time>

          <div 
            className={`${styled.postContent} ${styled.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          <div className={styled.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
    
  const prismic = getPrismicClient();

  const response = await prismic.getByUID('publication', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  }
  
  return {
    props: {
      post,
    },
    redirect: 60 * 30, // 30 minutes
  }
}