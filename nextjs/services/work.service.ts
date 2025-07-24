import { workRepository } from "@/repositories/work.repository";

export const workService = {
    getByAttractionId: (attraction_id: number) =>
        workRepository.findByAttractionId(attraction_id),

    create: (attraction_id: number, data: {
        title: string;
        author: string;
        description: string;
    }) => workRepository.create({ ...data, attraction_id }),

    remove: (id: number) => workRepository.delete(id),
}