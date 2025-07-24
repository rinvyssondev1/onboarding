import { workService } from "@/services/work.service";
import { NextApiRequest, NextApiResponse } from "next";

export const workController = {
    getAllByAttractionId: async (req: NextApiRequest, res: NextApiResponse) => {
        const attractionId = Number(req.query.id);
        const data = await workService.getByAttractionId(attractionId);
        return res.status(200).json(data);
    },

    create: async (req: NextApiRequest, res: NextApiResponse) => {
        const attractionId = Number(req.query.id);
        const data = await workService.create(attractionId, req.body);
        return res.status(201).json(data);
    },

    remove: async (req: NextApiRequest, res: NextApiResponse) => {
        const workId = Number(req.query.workId);
        await workService.remove(workId);
        return res.status(204).end();
    },

}