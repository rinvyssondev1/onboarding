import prisma from "@/lib/prisma";

export const attractionController = {
    findAll: () => prisma.attraction.findMany(),

    findById: (id: number) => prisma.attraction.findUnique({ where: { id } }),

    create: (data: { name: string; description: string }) =>
        prisma.attraction.create({ data }),

    update: (id: number, data: { name?: string; description?: string; }) =>
        prisma.attraction.update({ where: { id }, data }),

    delete: (id: number) => prisma.attraction.delete({ where: { id } }),
}