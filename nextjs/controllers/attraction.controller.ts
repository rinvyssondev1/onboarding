import { attractionService } from "@/services/attraction.service";
import { NextApiRequest, NextApiResponse } from "next";

export const attractionController = {
    getAll: async (_req: NextApiRequest, res: NextApiResponse) => {
        const data = await attractionService.getAll();
        res.status(200).json(data);
    },

    getById: async (req: NextApiRequest, res: NextApiResponse) => {
        const id = Number(req.query.id);
        const data = await attractionService.getById(id);
        return res.status(200).json(data);
    },

    create: async (req: NextApiRequest, res: NextApiResponse) => {
        const data = await attractionService.create(req.body);
        return res.status(201).json(data);
    },

    update: async (req: NextApiRequest, res: NextApiResponse) => {
        const id = Number(req.query.id);
        const data = await attractionService.update(id, req.body);
        return res.status(200).json(data);
    },

    remove: async (req: NextApiRequest, res: NextApiResponse) => {
        const id = Number(req.query.id);
        await attractionService.remove(id);
        return res.status(204).end();
    },
}