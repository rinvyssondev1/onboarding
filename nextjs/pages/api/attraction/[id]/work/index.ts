import { workController } from "@/controllers/work.controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") return workController.getAllByAttractionId(req, res);
    if (req.method === "POST") return workController.create(req, res);

    return res.status(405).end();
}