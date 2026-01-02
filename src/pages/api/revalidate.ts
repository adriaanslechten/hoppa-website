import type { NextApiRequest, NextApiResponse } from "next";
import { purgeCache } from "@netlify/functions";

/**
 * On-demand ISR revalidation endpoint for Netlify.
 * Called by the backend when articles are published/updated.
 *
 * POST /api/revalidate
 * Body: { paths: string[], secret: string }
 *
 * Example:
 * { "paths": ["/blog", "/blog/my-article-slug"], "secret": "your-secret" }
 *
 * Note: On Netlify, this purges the CDN cache for the given paths,
 * triggering regeneration on the next request.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { paths, secret } = req.body;

  // Validate secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ error: "Invalid secret" });
  }

  // Validate paths
  if (!paths || !Array.isArray(paths) || paths.length === 0) {
    return res.status(400).json({ error: "paths must be a non-empty array" });
  }

  try {
    // Netlify: Purge cache for the given paths
    // This uses Netlify's cache purge API via @netlify/functions
    await purgeCache({ tags: paths });

    return res.status(200).json({
      revalidated: paths,
      message: `Purged cache for ${paths.length} path(s)`,
    });
  } catch (error) {
    console.error("Revalidation error:", error);

    // If purgeCache fails (e.g., not on Netlify), still return success
    // The ISR revalidate timer will handle it
    return res.status(200).json({
      revalidated: [],
      message: "Cache purge not available, relying on ISR timer",
      note: "This is expected in local development",
    });
  }
}
