import prisma from "@/lib/prisma";

export const workRepository = {
    findByAttractionId: (attraction_id: number) =>
        prisma.work.findMany({ where: { attraction_id } }),

    create: (data: {
        title: string;
        author: string;
        description: string;
        attraction_id: number;
    }) => prisma.work.create({
        data: {
            title: data.title,
            description: data.description,
            author: data.author,
            attraction: {
                connect: { id: data.attraction_id }
            }
        }
    }),

    delete: (id: number) => prisma.work.delete({ where: { id } }),
}