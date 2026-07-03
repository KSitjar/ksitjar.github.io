import { get } from "node:https";
import { XMLParser } from "fast-xml-parser";
import { fallbackPosts } from "../data/fallbackPosts";

export type SubstackPost = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  image?: string;
};

const SUBSTACK_FEED_URL = "https://misocloud.substack.com/feed";

type FeedRecord = Record<string, unknown>;

const parser = new XMLParser({
  attributeNamePrefix: "",
  ignoreAttributes: false,
  trimValues: true,
});

export async function getSubstackPosts(limit?: number): Promise<SubstackPost[]> {
  try {
    const xml = await fetchFeedXml(SUBSTACK_FEED_URL);
    const feed = parser.parse(xml) as FeedRecord;
    const items = normalizeItems(feed);
    const posts = items.map(normalizePost).filter(isPost);

    return withLimit(posts.length > 0 ? posts : fallbackPosts, limit);
  } catch (error) {
    console.warn("Using fallback Substack posts:", error);
    return withLimit(fallbackPosts, limit);
  }
}

function fetchFeedXml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = get(
      url,
      {
        headers: {
          Accept: "application/rss+xml, application/xml, text/xml, */*",
          "Accept-Language": "en-US,en;q=0.9",
          Referer: "https://misocloud.substack.com/",
          "User-Agent":
            "Mozilla/5.0 (compatible; misocloud.com build; +https://misocloud.com)",
        },
        timeout: 8000,
      },
      (response) => {
        if (!response.statusCode || response.statusCode < 200 || response.statusCode >= 300) {
          response.resume();
          reject(new Error(`Substack feed returned ${response.statusCode ?? "unknown status"}`));
          return;
        }

        response.setEncoding("utf8");

        let body = "";
        response.on("data", (chunk: string) => {
          body += chunk;
        });
        response.on("end", () => resolve(body));
      },
    );

    request.on("timeout", () => {
      request.destroy(new Error("Substack feed request timed out"));
    });
    request.on("error", reject);
  });
}

function normalizeItems(feed: FeedRecord): FeedRecord[] {
  const rss = asRecord(feed.rss);
  const channel = asRecord(rss.channel);
  const item = channel.item;

  if (Array.isArray(item)) {
    return item.filter(isRecord);
  }

  return isRecord(item) ? [item] : [];
}

function normalizePost(item: FeedRecord): SubstackPost | null {
  const title = text(item.title);
  const url = text(item.link) || text(item.guid);
  const publishedAt = text(item.pubDate);
  const description = cleanDescription(text(item.description));

  if (!title || !url || !publishedAt) {
    return null;
  }

  return {
    title,
    url,
    publishedAt: new Date(publishedAt).toISOString(),
    description,
    image: findImage(item),
  };
}

function isPost(post: SubstackPost | null): post is SubstackPost {
  return Boolean(post);
}

function withLimit(posts: SubstackPost[], limit?: number): SubstackPost[] {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

function findImage(item: FeedRecord): string | undefined {
  const enclosure = asRecord(item.enclosure);
  const mediaContent = asRecord(item["media:content"]);
  const encoded = text(item["content:encoded"]);
  const imageMatch = encoded.match(/<img[^>]+src=["']([^"']+)["']/i);

  return text(enclosure.url) || text(mediaContent.url) || imageMatch?.[1];
}

function cleanDescription(value: string): string {
  const withoutTags = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  if (withoutTags.length <= 180) {
    return withoutTags;
  }

  return `${withoutTags.slice(0, 177).trim()}...`;
}

function text(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (isRecord(value) && typeof value["#text"] === "string") {
    return value["#text"].trim();
  }

  return "";
}

function asRecord(value: unknown): FeedRecord {
  return isRecord(value) ? value : {};
}

function isRecord(value: unknown): value is FeedRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
