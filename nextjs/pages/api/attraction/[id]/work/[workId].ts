import { workController } from "@/controllers/work.controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") return workController.remove(req, res);
    return res.status(405).end();
}