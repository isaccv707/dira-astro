import type { APIRoute } from "astro";
import { apiGet } from "../api/apiGet";
import { getAllService } from "../api/servicesApi/serviceApi";
import type {
  Paginated,
  ServiceDetail,
} from "../interfaces/service.interface";
import type { Post } from "../interfaces/blog.interface";
import { DEFAULT_BRANCH_ID, absoluteUrl } from "../constants/site";
import { createTtlCache } from "../utils/ttlCache";

// Every route is SSR, so the sitemap is built from the API: static pages,
// services, the sellable studies of each service and published posts.
// Branch-scoped content uses the default branch (what crawlers render).

interface SitemapEntry {
  path: string;
  lastmod?: string;
}

const STATIC_PATHS = ["/", "/about", "/blog", "/branches", "/contact", "/quoter"];
const PAGE_LIMIT = 100;
const MAX_PAGES = 50;

const sitemapCache = createTtlCache<string>(60 * 60 * 1000);

const getServiceStudySlugs = async (serviceSlug: string): Promise<string[]> => {
  const slugs: string[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const detail = await apiGet<ServiceDetail>(`/services/${serviceSlug}`, {
      branchId: DEFAULT_BRANCH_ID,
      page,
      limit: PAGE_LIMIT,
    });
    const studies = detail?.studies;
    if (!studies) break;
    slugs.push(...studies.data.map((study) => study.slug));
    if (page >= studies.totalPages) break;
  }
  return slugs;
};

const getPostEntries = async (): Promise<SitemapEntry[]> => {
  const entries: SitemapEntry[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const response = await apiGet<
      Partial<Paginated<Post>> & { meta?: { totalPages?: number } }
    >("/posts", {
      branchId: DEFAULT_BRANCH_ID,
      status: "PUBLISHED",
      page,
      limit: PAGE_LIMIT,
    });
    const posts = response?.data ?? [];
    entries.push(
      ...posts.map((post) => ({
        path: `/blog/${post.slug}`,
        lastmod: post.updatedAt,
      })),
    );
    const totalPages = response?.meta?.totalPages ?? response?.totalPages ?? 1;
    if (posts.length === 0 || page >= totalPages) break;
  }
  return entries;
};

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const buildSitemap = async (): Promise<string> => {
  const services = await getAllService(DEFAULT_BRANCH_ID);
  const sellable = services.filter((s) => (s._count?.studies ?? 0) > 0);

  const [studySlugLists, posts] = await Promise.all([
    Promise.all(sellable.map((s) => getServiceStudySlugs(s.slug))),
    getPostEntries().catch((error) => {
      console.error("Sitemap: error fetching posts:", error);
      return [];
    }),
  ]);
  const studySlugs = [...new Set(studySlugLists.flat())];

  const entries: SitemapEntry[] = [
    ...STATIC_PATHS.map((path) => ({ path })),
    ...services.map((s) => ({ path: `/service/${s.slug}` })),
    ...studySlugs.map((slug) => ({ path: `/study/${slug}` })),
    ...posts,
  ];

  const urls = entries
    .map(({ path, lastmod }) => {
      const date = lastmod ? new Date(lastmod) : null;
      const lastmodTag =
        date && !Number.isNaN(date.getTime())
          ? `<lastmod>${date.toISOString()}</lastmod>`
          : "";
      return `<url><loc>${escapeXml(absoluteUrl(path))}</loc>${lastmodTag}</url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
};

export const GET: APIRoute = async () => {
  let xml = sitemapCache.get("sitemap");
  if (!xml) {
    try {
      xml = await buildSitemap();
      sitemapCache.set("sitemap", xml);
    } catch (error) {
      console.error("Error building sitemap:", error);
      xml = sitemapCache.getStale("sitemap");
      if (!xml) return new Response("Sitemap unavailable", { status: 503 });
    }
  }

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
