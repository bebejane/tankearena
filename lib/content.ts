import type { StructuredTextGraphQlResponse } from "react-datocms";

export type PageSectionContent = {
  title: string;
  image: {
    url: string;
    alt: string | null;
    width: number;
    height: number;
  } | null;
  text: StructuredTextGraphQlResponse;
};

export type NewsItemContent = {
  title: string;
  image: PageSectionContent["image"];
  intro: StructuredTextGraphQlResponse;
  url: string;
  type: "Rapport" | "Event";
  endDate: string | null;
};
