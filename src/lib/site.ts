import siteContent from "@/content/site.json";

export type SiteContent = typeof siteContent;

export function getSiteContent(): SiteContent {
  return siteContent;
}
