import { attractionController } from "@/repositories/attraction.repository";

export const attractionService = {
    getAll: () => attractionController.findAll(),

    getById: (id: number) => attractionController.findById(id),

    create: (data: { name: string; description: string }) =>
        attractionController.create(data),

    update: (id: number, data: { name?: string; description?: string }) =>
        attractionController.update(id, data),

    remove: (id: number) => attractionController.delete(id),
}