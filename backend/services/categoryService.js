import prisma from '../prismaClient.js';

export const getAllCategories = async() => {
    return await prisma.category.findMany();
};

export const updateCategoryById = async(id, name) => {
    return await prisma.category.update({
        where: { id: parseInt(id) },
        data: { name },
    });
};

export const deleteCategoryById = async(id) => {
    return await prisma.category.delete({
        where: { id: parseInt(id) },
    });
};