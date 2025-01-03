import * as aboutService from '../services/aboutService.js';

// Get all about pages
export async function getAllAboutPages(req, res) {
    try {
        const aboutPages = await aboutService.getAllAboutPages();
        return res.status(200).json(aboutPages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Get a single about page by ID
export async function getAboutPageById(req, res) {
    const { id } = req.params;
    try {
        const aboutPage = await aboutService.getAboutPageById(parseInt(id));
        if (aboutPage) {
            return res.status(200).json(aboutPage);
        } else {
            return res.status(404).json({ message: "About page not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Create a new about page
export async function createAboutPage(req, res) {
    const { title, description, imageUrl } = req.body;
    const data = { title, description, imageUrl };

    try {
        const createdAboutPage = await aboutService.createAboutPage(data);
        return res.status(201).json(createdAboutPage);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Update an about page
export async function updateAboutPage(req, res) {
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;
    const data = { title, description, imageUrl };

    try {
        const updatedAboutPage = await aboutService.updateAboutPage(parseInt(id), data);
        return res.status(200).json(updatedAboutPage);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Delete an about page
export async function deleteAboutPage(req, res) {
    const { id } = req.params;
    try {
        await aboutService.deleteAboutPage(parseInt(id));
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}