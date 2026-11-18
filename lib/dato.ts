import "server-only";

import type { NewsItemContent, PageSectionContent } from "@/lib/content";
import type { StructuredTextGraphQlResponse } from "react-datocms";

const PAGE_CONTENT_QUERY = /* GraphQL */ `
  query PageContent {
    start {
      title
      image {
        url
        alt
        width
        height
      }
      text {
        value
      }
    }
    about {
      title
      image {
        url
        alt
        width
        height
      }
      text {
        value
      }
    }
    contact {
      title
      image {
        url
        alt
        width
        height
      }
      text {
        value
      }
    }
    allReports {
      title
      image {
        url
        alt
        width
        height
      }
      intro {
        value
      }
      url
    }
    allEvents {
      title
      image {
        url
        alt
        width
        height
      }
      intro {
        value
      }
      url
      endDate
    }
  }
`;

type DatoResponse = {
  data?: Record<string, unknown> | null;
  errors?: { message: string }[];
};

async function queryDato(query: string, token: string) {
  const response = await fetch(
    process.env.DATO_API_URL ?? "https://graphql.datocms.com/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`DatoCMS request failed with status ${response.status}.`);
  }

  const result = (await response.json()) as DatoResponse;
  if (result.errors?.length) {
    throw new Error(
      `DatoCMS GraphQL error: ${result.errors.map(({ message }) => message).join("; ")}`,
    );
  }

  return result.data;
}

function isPageImage(
  value: unknown,
): value is NonNullable<PageSectionContent["image"]> {
  if (typeof value !== "object" || value === null) return false;

  const image = value as Record<string, unknown>;
  return (
    typeof image.url === "string" &&
    (typeof image.alt === "string" || image.alt === null) &&
    typeof image.width === "number" &&
    typeof image.height === "number"
  );
}

function isPageSectionContent(value: unknown): value is PageSectionContent {
  if (typeof value !== "object" || value === null) return false;

  const page = value as Record<string, unknown>;
  if (
    typeof page.title !== "string" ||
    (page.image !== null && !isPageImage(page.image)) ||
    typeof page.text !== "object" ||
    page.text === null
  ) {
    return false;
  }

  const text = page.text as Record<string, unknown>;
  return (
    typeof text.value === "object" &&
    text.value !== null
  );
}

function isNewsItemContent(
  value: unknown,
): value is Omit<NewsItemContent, "type" | "endDate"> {
  if (typeof value !== "object" || value === null) return false;

  const report = value as Record<string, unknown>;
  if (
    typeof report.title !== "string" ||
    (report.image !== null && !isPageImage(report.image)) ||
    typeof report.intro !== "object" ||
    report.intro === null ||
    typeof report.url !== "string"
  ) {
    return false;
  }

  const intro = report.intro as Record<string, unknown>;
  return typeof intro.value === "object" && intro.value !== null;
}

function isEventContent(
  value: unknown,
): value is Omit<NewsItemContent, "type"> {
  if (!isNewsItemContent(value) || typeof value !== "object" || value === null) {
    return false;
  }

  const endDate = (value as Record<string, unknown>).endDate;
  return (
    endDate === null ||
    (typeof endDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(endDate))
  );
}

export async function getPageContent(): Promise<{
  start: PageSectionContent;
  about: PageSectionContent;
  contact: PageSectionContent;
  news: NewsItemContent[];
}> {
  const token = process.env.DATOCMS_API_TOKEN;

  if (!token) {
    throw new Error("DATOCMS_API_TOKEN must be set to load page content.");
  }

  const data = await queryDato(PAGE_CONTENT_QUERY, token);
  if (
    !isPageSectionContent(data?.start) ||
    !isPageSectionContent(data?.about) ||
    !isPageSectionContent(data?.contact) ||
    !Array.isArray(data?.allReports) ||
    !data.allReports.every(isNewsItemContent) ||
    !Array.isArray(data?.allEvents) ||
    !data.allEvents.every(isEventContent)
  ) {
    throw new Error(
      "DatoCMS returned invalid page or news content. Check the start, about, contact, report, and event models and their fields.",
    );
  }

  return {
    start: data.start,
    about: data.about,
    contact: data.contact,
    news: [
      ...data.allReports.map((item) => ({
        ...item,
        type: "Rapport" as const,
        endDate: null,
      })),
      ...data.allEvents.map((item) => ({
        ...item,
        type: "Event" as const,
      })),
    ],
  };
}
