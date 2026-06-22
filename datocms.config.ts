import { apiQuery } from "next-dato-utils/api";
import { AllPostsDocument } from "@/graphql";
import {
  DatoCmsConfig,
  getUploadReferenceRoutes,
  getItemReferenceRoutes,
} from "next-dato-utils/config";
import { MetadataRoute } from "next";

export default {
  routes: {
    start: async (record, locale) => [`/${locale}`],
    upload: async (record) => getUploadReferenceRoutes(record.id),
  },
  sitemap: async () => {
    //const { allPosts } = await apiQuery(AllPostsDocument, { all: true });
    return [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ] as MetadataRoute.Sitemap;
  },
  manifest: async () => {
    return {
      name: "Tankearena för kultur",
      short_name: "Tankearena för kultur",
      description: "Tankearena för kultur",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [
        {
          src: "/favicon.ico",
          sizes: "any",
          type: "image/x-icon",
        },
      ],
    } satisfies MetadataRoute.Manifest;
  },
  robots: async () => {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
    };
  },
} satisfies DatoCmsConfig;
