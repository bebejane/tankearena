import s from "./page.module.scss";
import { AllPostsDocument, StartDocument } from "@/graphql";
import { apiQuery } from "next-dato-utils/api";
import { DraftMode, Markdown } from "next-dato-utils/components";
import { setRequestLocale } from "next-intl/server";

import { notFound } from "next/navigation";
import Content from "@/components/content/Content";

export default async function Home({ params }: PageProps<"/">) {
  // const { start, draftUrl } = await apiQuery(StartDocument, {
  // 	variables: { locale: locale as SiteLocale },
  // });

  // const { allPosts, draftUrl: postsDraftUrl } = await apiQuery(AllPostsDocument, {
  // 	variables: { locale: locale as SiteLocale },
  // 	tags: ['color'],
  // });

  // if (!start) return notFound();

  return (
    <>
      <article className={s.article}></article>
    </>
  );
}
