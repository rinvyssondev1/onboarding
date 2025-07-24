import { attractionController } from "@/controllers/attraction.controller";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") return attractionController.getById(req, res);
    if (req.method === "PATCH") return attractionController.update(req, res);
    if (req.method === "DELETE") return attractionController.remove(req, res);

    return res.status(405).end();
}