// pages/api/revalidate.ts
// From Next.js docs https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log("REVALIDATE_HANDLER request query.path:", req.query.path);
        if (req.query.path !== undefined && req.query.path !== null && Array.isArray(req.query.path) === false) {
            const thePath: string = Array.isArray(req.query.path) ? req.query.path[0] : req.query.path;
            console.log(`REVALIDATE_HANDLER request query.path: '${thePath}'`);

            await res.revalidate(thePath);
        }
        return res.json({ revalidated: true });
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        console.log("REVALIDATE_HANDLER err:", err);
        return res.status(500).send(`Error revalidating: ${err}`);
    }
}