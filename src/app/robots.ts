import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/profile/", "/auth/", "/register/"],
    },
    sitemap: `${process.env.NEXT_WEBSITE_URL}sitemap.xml`,
  };
}
