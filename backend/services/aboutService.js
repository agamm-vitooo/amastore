import prisma from '../prismaClient.js';

// Get all about pages
export async function getAllAboutPages() {
    try {
        return await prisma.aboutPage.findMany(); // Mengambil semua AboutPage
    } catch (error) {
        throw new Error("Error fetching about pages: " + error.message);
    }
}

// Get a single about page by ID
export async function getAboutPageById(id) {
    try {
        return await prisma.aboutPage.findUnique({
            where: { id: id },
        });
    } catch (error) {
        throw new Error("Error fetching about page by ID: " + error.message);
    }
}

// Create a new about page
export async function createAboutPage(data) {
    try {
        return await prisma.aboutPage.create({
            data: data, // data harus sesuai dengan schema AboutPage
        });
    } catch (error) {
        throw new Error("Error creating about page: " + error.message);
    }
}

// Update an existing about page
export async function updateAboutPage(id, data) {
    try {
        return await prisma.aboutPage.update({
            where: { id: id },
            data: data, // data yang akan diupdate
        });
    } catch (error) {
        throw new Error("Error updating about page: " + error.message);
    }
}

// Delete an about page
export async function deleteAboutPage(id) {
    try {
        return await prisma.aboutPage.delete({
            where: { id: id },
        });
    } catch (error) {
        throw new Error("Error deleting about page: " + error.message);
    }
}