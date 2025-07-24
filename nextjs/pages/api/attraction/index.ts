import { attractionController } from "@/controllers/attraction.controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") return attractionController.getAll(req, res);
    if (req.method === "POST") return attractionController.create(req, res);

    return res.status(405).end();
}